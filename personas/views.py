from django.shortcuts import render, get_object_or_404, redirect
from .models import Persona
from django.http import JsonResponse


def lista_personas(request):
    personas = Persona.objects.all().values()
    return JsonResponse(list(personas), safe=False)

def mostrar_persona(request, id):
    persona = get_object_or_404(Persona, id=id)
    return JsonResponse({
        'id': persona.id,
        'nombre': persona.nombre,
        'apellido': persona.apellido,
        'edad': persona.edad,
        'nacionalidad': persona.nacionalidad,
        'email': persona.email,
        'direccion': persona.direccion
    })



def crear_persona(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        edad = request.POST.get('edad')
        nacionalidad = request.POST.get('nacionalidad')
        email = request.POST.get('email')
        direccion = request.POST.get('direccion')
        persona = Persona.objects.create(nombre=nombre, apellido=apellido, edad=edad, nacionalidad=nacionalidad, email=email, direccion=direccion)
        return JsonResponse({'id': persona.id, 'nombre':persona.nombre,'apellido':persona.apellido,'edad':persona.edad,'nacionalidad':persona.nacionalidad,'email':persona.email,'direccion':persona.direccion})
    
    
def editar_persona(request, id):
    persona = get_object_or_404(Persona, id=id)
    if request.method =='POST':
        persona.nombre = request.POST.get('nombre')
        persona.apellido = request.POST.get('apellido')
        persona.edad = request.POST.get('edad')
        persona.nacionalidad = request.POST.get('nacionalidad')
        persona.email = request.POST.get('email')
        persona.direccion = request.POST.get('direccion')
        persona.save()
        return JsonResponse({'id': persona.id, 'nombre':persona.nombre,'apellido':persona.apellido,'edad':persona.edad,'nacionalidad':persona.nacionalidad,'email':persona.email,'direccion':persona.direccion})


def eliminar_persona(request, id):
    persona = get_object_or_404(Persona, id=id)
    persona.delete()
    return JsonResponse({'status': 'Persona eliminada'})
        
        

