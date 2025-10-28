# Rommelo Balandra - Portfolio Website

A modern, responsive Django portfolio website showcasing my skills as a Python Backend Developer. Built with Django 5.2.6, featuring a contact form with email notifications, project showcase, and admin panel for easy content management.

## 🚀 Live Demo

Visit the live portfolio: [Your Portfolio URL]

## ✨ Features

- **Responsive Design** - Modern Bootstrap 5 UI that works on all devices
- **Project Showcase** - Display your projects with images, descriptions, and links
- **Contact Form** - Working contact form with email notifications
- **Resume Download** - Direct download link for your resume
- **Admin Panel** - Easy content management through Django admin
- **Social Links** - LinkedIn and GitHub profile integration
- **Email Integration** - Gmail SMTP configuration for contact form
- **Dynamic Content** - Automatic year updates and line break support

## 🛠️ Tech Stack

- **Backend**: Django 5.2.6
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **Database**: SQLite (development), PostgreSQL (production)
- **Email**: Gmail SMTP
- **Icons**: Font Awesome 6
- **Images**: Pillow for image processing

## 📋 Prerequisites

- Python 3.8+
- pip (Python package installer)
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/melo-b/django-portfolio-site.git
cd django-portfolio-site
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 7. Run Development Server
```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000` to view your portfolio!

## 📧 Email Configuration

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Google Account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - App passwords → Generate password for "Mail"
3. **Update settings.py**:
   ```python
   EMAIL_HOST_USER = "your-email@gmail.com"
   EMAIL_HOST_PASSWORD = "your-16-character-app-password"
   ```

### Alternative Email Providers

**Outlook/Hotmail:**
```python
EMAIL_HOST = "smtp-mail.outlook.com"
EMAIL_PORT = 587
```

**Yahoo:**
```python
EMAIL_HOST = "smtp.mail.yahoo.com"
EMAIL_PORT = 587
```

## 🎨 Customization

### Personal Information
1. **Update About Section** in `portfolio/templates/portfolio/index.html`
2. **Add Your Photo** to `portfolio/static/portfolio/images/`
3. **Upload Resume** as `Rommelo_Balandra_Resume.pdf` in the images folder
4. **Update Social Links** in the footer

### Projects
1. **Access Admin Panel**: `http://127.0.0.1:8000/admin`
2. **Add Projects**: Click "Projects" → "Add Project"
3. **Upload Images**: Add project screenshots to `portfolio/static/portfolio/images/`
4. **Add Descriptions**: Use HTML line breaks (`<br>`) for formatting

### Styling
- **Colors**: Modify CSS variables in the `<style>` section
- **Fonts**: Update Google Fonts links in the head section
- **Layout**: Adjust Bootstrap classes for different layouts

## 📁 Project Structure

```
portfolio-website/
├── portfolio/                    # Main Django app
│   ├── static/portfolio/         # Static files (CSS, JS, images)
│   │   └── images/              # Project images and resume
│   ├── templates/portfolio/     # HTML templates
│   ├── models.py                # Database models
│   ├── views.py                 # View functions
│   ├── forms.py                 # Contact form
│   └── admin.py                 # Admin configuration
├── portfolio_website/           # Django project settings
│   ├── settings.py              # Project configuration
│   ├── urls.py                  # URL routing
│   └── wsgi.py                  # WSGI configuration
├── manage.py                    # Django management script
├── requirements.txt             # Python dependencies
└── README.md                   # This file
```

## 🚀 Deployment

### Render (Recommended)
1. **Connect GitHub repository** to Render
2. **Set build command**: `pip install -r requirements.txt`
3. **Set start command**: `gunicorn portfolio_website.wsgi:application`
4. **Add environment variables**:
   - `SECRET_KEY`: Generate a new secret key
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: Your domain
   - `EMAIL_HOST_USER`: Your email
   - `EMAIL_HOST_PASSWORD`: Your app password

### Heroku
1. **Install Heroku CLI**
2. **Create Procfile**:
   ```
   web: gunicorn portfolio_website.wsgi:application
   ```
3. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Railway
1. **Connect GitHub repository**
2. **Set environment variables**
3. **Deploy automatically**

## 🔧 Environment Variables (Production)

Create a `.env` file for production:
```env
SECRET_KEY=your-secure-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

## 🧪 Testing

### Test Contact Form
1. **Fill out contact form** on your portfolio
2. **Check email** for notification
3. **Verify message** appears in admin panel

### Test Resume Download
1. **Click resume button** in About section
2. **Verify PDF downloads** correctly

### Test Responsive Design
1. **Test on mobile devices**
2. **Check different screen sizes**
3. **Verify navigation works**

## 📈 Future Enhancements

- [ ] Blog section for technical articles
- [ ] Project filtering and search
- [ ] Dark mode toggle
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] API endpoints for projects
- [ ] Comment system for projects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**Rommelo Balandra** - Python Backend Developer

- **Background**: Mechanical Engineer turned Backend Developer
- **Specialization**: Python, Django, REST APIs, Authentication Systems
- **Certifications**: Meta Back-End Developer Certificate
- **Interests**: Travel, Pickleball, Golf

## 📞 Contact

- **Email**: rommelo.b@gmail.com
- **LinkedIn**: [rommelobalandra](https://www.linkedin.com/in/rommelobalandra/)
- **GitHub**: [melo-b](https://github.com/melo-b)

## 🙏 Acknowledgments

- Bootstrap 5 for responsive design
- Font Awesome for icons
- Django community for excellent documentation
- Open source contributors

---

⭐ **Star this repository** if you found it helpful!
