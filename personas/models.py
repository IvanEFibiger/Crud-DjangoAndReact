from django.db import models

# Create your models here.
class Persona(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField()
    nacionalidad = models.CharField(max_length=100)
    email = models.EmailField()
    direccion = models.CharField(max_length=100)
    
    
    def __str__(self):
        return f'{self.nombre} {self.apellido}'