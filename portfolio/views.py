from django.shortcuts import render
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMessage
import logging
import os
from .models import Project
from .forms import ContactForm

logger = logging.getLogger(__name__)


def index(request):
    projects = Project.objects.all()
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save()
            
            # Send email notification
            try:
                # Get recipient email from environment variable
                recipient_email = os.environ.get('CONTACT_TO_EMAIL', settings.DEFAULT_FROM_EMAIL)
                
                send_mail(
                    f'New Contact Form Submission: {contact.subject}',
                    f'Name: {contact.name}\nEmail: {contact.email}\nSubject: {contact.subject}\nMessage: {contact.message}',
                    settings.DEFAULT_FROM_EMAIL,  # From: Mailgun postmaster
                    [recipient_email],  # To: Your personal email
                    fail_silently=False,
                )
                logger.info(f"Email sent successfully for contact: {contact.name} to {recipient_email}")
            except Exception as e:
                logger.error(f"Email sending failed: {str(e)}")
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
