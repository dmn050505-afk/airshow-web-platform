from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Autenticação
    path('api/register/', views.signup),
    path('api/login/', views.login_view),
    path('api/logout/', views.logout_view),
    path('api/me/', views.user_view),

    # Eventos
    path('api/eventos/', views.eventos_view),
    path('api/eventos/<int:pk>/', views.evento_detail),

    # Pilotos
    path('api/pilotos/', views.pilotos_view),

    # Aeronaves
    path('api/aeronaves/', views.aeronaves_view),

    # Bilhetes
    path('api/bilhetes/', views.bilhetes_view),

    # Comentários
    path('api/comentarios/', views.comentarios_view),

    # Avaliações
    path('api/avaliacoes/', views.avaliacoes_view),

    # Likes
    path('api/likes/<int:aeronave_id>/', views.like_toggle),

    # Fotografias
    path('api/fotografias/', views.fotografias_view),

    #Voto
    path('api/votos/', views.votos_view),

    #Voluntário
    path('api/voluntarios/', views.voluntarios_view),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)