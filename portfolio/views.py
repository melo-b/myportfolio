from django.shortcuts import render
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMessage
import logging
import os
import requests
from .models import Project
from .forms import ContactForm

logger = logging.getLogger(__name__)


def send_mailgun_email(to_email, subject, message):
    """Send email using Mailgun API"""
    try:
        api_key = settings.MAILGUN_API_KEY
        domain = settings.MAILGUN_DOMAIN
        
        if not api_key or not domain:
            logger.error("Mailgun API key or domain not configured")
            return False
            
        url = f"https://api.mailgun.net/v3/{domain}/messages"
        
        data = {
            "from": f"Portfolio Contact <postmaster@{domain}>",
            "to": [to_email],
            "subject": subject,
            "text": message
        }
        
        response = requests.post(
            url,
            auth=("api", api_key),
            data=data,
            timeout=10
        )
        
        if response.status_code == 200:
            logger.info(f"Email sent successfully via Mailgun API to {to_email}")
            return True
        else:
            logger.error(f"Mailgun API error: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        logger.error(f"Mailgun API exception: {str(e)}")
        return False


def index(request):
    projects = Project.objects.all()
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save()
            
            # Send email notification via Mailgun API
            try:
                # Get recipient email from environment variable
                recipient_email = os.environ.get('CONTACT_TO_EMAIL', 'rommelo.b@gmail.com')
                
                # Debug logging
                print(f"DEBUG: Attempting to send email via Mailgun API...")
                print(f"DEBUG: To: {recipient_email}")
                print(f"DEBUG: Subject: New Contact Form Submission: {contact.subject}")
                
                # Prepare email content
                subject = f'New Contact Form Submission: {contact.subject}'
                message = f'''New contact form submission received:

Name: {contact.name}
Email: {contact.email}
Subject: {contact.subject}

Message:
{contact.message}

---
This message was sent from your portfolio contact form.
'''
                
                # Send via Mailgun API
                success = send_mailgun_email(recipient_email, subject, message)
                
                if success:
                    print(f"DEBUG: Email sent successfully via Mailgun API!")
                    logger.info(f"Email sent successfully for contact: {contact.name} to {recipient_email}")
                else:
                    print(f"DEBUG: Email sending failed via Mailgun API")
                    logger.error(f"Email sending failed for contact: {contact.name}")
                    
            except Exception as e:
                print(f"DEBUG: Email sending exception: {str(e)}")
                logger.error(f"Email sending exception: {str(e)}")
                # Don't crash the form submission if email fails
            
            messages.success(request, 'Thank you for your message! I will get back to you soon.')
            form = ContactForm()  # Reset form
    else:
        form = ContactForm()
    
    context = {
        'projects': projects,
        'form': form,
    }
    return render(request, 'portfolio/index.html', context)
