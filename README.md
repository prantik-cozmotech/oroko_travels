# Modules for Oroko Travells

## Login

Django provides Base user model who can login in our web application. We can use Django's **authenticate**, **login** from `django.contrib.auth` module for user authentication and login. Once the user logs in `@login_required` decorator that works as a middleware that allows only authenticate user to access an API.

## Mailer

Django have their own module to handle sending Emails **django.core.mail**.


## DB Connection

To connect Django project to a PostgresSQL we have to add below in `settings.py` file of our project, fields must be changed according to the database configuration

```python
DB_NAME = "oroko_travels"
DB_USER = "oroko_user"
DB_HOST = "127.0.0.1"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME", DB_NAME),
        "USER": os.getenv("DB_USER", DB_USER),
        "PASSWORD": os.getenv("DB_PASSWORD", ""),
        "HOST": os.getenv("DB_HOST", DB_HOST),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}
```

## S3 connection for file storage

**Boto3** is the Amazon Web Services (AWS) Software Development Kit (SDK) for Python, which allows Python developers to write software that makes use of services like Amazon S3 and Amazon EC2.

The library **django-storage** contains multiple backend for file storage, it also supports **Amazon S3**.

1. Install both packages :

    ```bash
    pip install boto3 django-storages
    ```

2. In **settings.py** add the following configuration :

    ```python

    # settings.py

    INSTALLED_APPS = [
    ....,
    'storages',
    ]

    STATIC_URL = 'static/'
    MEDIA_URL = 'media/'

    AWS_ACCESS_KEY_ID = 'your_access_key_id'
    AWS_SECRET_ACCESS_KEY = 'your_secret_access_key'/v'
    AWS_STORAGE_BUCKET_NAME = 'your_bucket_name'
    AWS_S3_REGION_NAME = 'your_bucket_region'
    AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    AWS_S3_FILE_OVERWRITE = False

    STORAGES = {

        # Media file (image) management
        "default": {
            "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
        },

        # CSS and JS file management
        "staticfiles": {
            "BACKEND": "storages.backends.s3boto3.S3StaticStorage",
        },
    }
    ```

3. Change your base Document model :

    ```python

    # models.py

    from django.db import models


    class Document(models.Model):
        title = models.CharField(max_length=100)
        file = models.FileField(upload_to="documents/")
    ```

    With this configuration the file will automatically get uploaded to **S3 bucket** inside `document/` folder.

4. Below is a simple example on uploading a file from view :

    ```python
    from myapp.models import Document


    Document.objects.create(file=open('example.pdf', 'rb'))
    ```

## Rate Limiter and Redis

We can enforce **Rate limiting** in our Django app APIs using the **django-ratelimit** library and Djnago cache backend Redis.

1. Install **django-ratelimit** :

    ```bash
    pip install django-ratelimit redis
    ```

1. In **setting.py** configure Cache backend, Redis in this case :

    ```python

    # settings.py

    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.redis.RedisCache",
            "LOCATION": "redis://127.0.0.1:6379/1",
        }
    }
    ```

1. In your django app views use **ratelimit** decorator :

    ```python
    # view.py

    from django_ratelimit.decorators import ratelimit

    @ratelimit(key='ip', rate='100/h')
    def homeview(request):
        ....

    ```

1. To test Caching, open Django app Shell using below command :

    ```bash
    python manage.py shell
    ```

    and then run below statements in the shell :

    ```python
    from django.core.cache import cache


    cache.set("my_key": "hello redis", timeout=50)
    cache.get("my_key")
    ```

    If upon executing the last statement returns `"hello redis"` then Redis is running.


## CSRF Token

Django have built-in CSRF protection through it's middleware.

1. Enable it by enabling CSRF protection middleware in **settings.py** :

    ```python

    # settings.py

    MIDDLEWARE = [
        ...,
        'django.middleware.csrf.CsrfViewMiddleware',
    ]

    ```

2. To use CSRF token in Forms just include `{% csrf_token %}` template tag in your form:

    ```html
    <form method="post" action="/submit-data/">
        {% csrf_token %}
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        <button type="submit">Submit</button>
    </form>
    ```

## CORS

In Django CORS can be managed using `django-cors-headers` library.

1. Installing the library :

    ```bash
    pip install django-cors-headers
    ```

1. In your project **settings.py** file add this in installed apps :

    ```python
    INSTALLED_APPS = [
        ...,
        "corsheaders",
        ...,
    ```

1. Enable the app middleware:

    ```python
    MIDDLEWARE = [
        ...,
        "corsheaders.middleware.CorsMiddleware",
        "django.middleware.common.CommonMiddleware",
        ...,
        ]
    ```

1. You can allow the URLs be adding them as below :

    ```python
    CORS_ALLOWED_ORIGINS = [
        "https://example.com",
        "https://sub.example.com",
        "http://localhost:8080",
        "http://127.0.0.1:9000",
    ]
    ```

## Session Management

Django manage sessions internally and enables by default. We can access session data from `request.session`, for example :

```
# set session data
request.session["theme"] = "dark"

# get session data
theme = request.session.get("theme")

# delete session data
del request.session["theme"]
```
