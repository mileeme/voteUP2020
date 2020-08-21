from django.urls import path
from . import views 
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static

app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('privacy', views.privacy, name='privacy'),
    path('shevotes', views.sheVotes, name='she_votes'),
]

# urlpatterns += staticfiles_urlpatterns()
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
