from django.urls import path
from . import views


urlpatterns = [
    path('personas/', views.lista_personas, name='lista_personas'),
    path('personas/<int:id>/', views.mostrar_persona, name='mostrar_persona'),
    path('personas/crear/', views.crear_persona, name='crear_persona'),
    path('personas/editar/<int:id>/', views.editar_persona, name='editar_persona'),
    path('personas/eliminar/<int:id>/', views.eliminar_persona, name='eliminar_persona'),
]
