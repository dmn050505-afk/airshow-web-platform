from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class Piloto(models.Model):
    nome = models.CharField(max_length=100)
    nacionalidade = models.CharField(max_length=100)
    biografia = models.TextField(blank=True)
    fotografia = models.ImageField(upload_to='pilotos/', blank=True, null=True)

    def __str__(self):
        return self.nome


class Aeronave(models.Model):
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    pais_origem = models.CharField(max_length=100)
    imagem = models.ImageField(upload_to='aeronaves/', blank=True, null=True)
    descricao = models.TextField(blank=True)
    piloto = models.ForeignKey(Piloto, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nome


class Evento(models.Model):
    nome = models.CharField(max_length=200)
    data = models.DateField()
    local = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    imagem = models.ImageField(upload_to='eventos/', blank=True, null=True)
    capacidade = models.IntegerField(default=0)
    preco_bilhete = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    aeronaves = models.ManyToManyField(Aeronave, blank=True)

    def __str__(self):
        return self.nome


class UserProfile(models.Model):
    utilizador = models.OneToOneField(User, on_delete=models.CASCADE)
    fotografia = models.ImageField(upload_to='perfis/', blank=True, null=True)
    biografia = models.TextField(blank=True)
    morada = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.utilizador.username


class Bilhete(models.Model):
    TIPOS = [('normal', 'Normal'), ('vip', 'VIP')]
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=10, choices=TIPOS, default='normal')
    data_compra = models.DateTimeField(auto_now_add=True)
    valido = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.utilizador.username} - {self.evento.nome}"


class Comentario(models.Model):
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    texto = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.utilizador.username} - {self.evento.nome}"


class Avaliacao(models.Model):
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    classificacao = models.IntegerField(choices=[(i, i) for i in range(1, 6)])

    class Meta:
        unique_together = ('utilizador', 'evento')

    def __str__(self):
        return f"{self.utilizador.username} - {self.evento.nome} ({self.classificacao}★)"


class Like(models.Model):
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    aeronave = models.ForeignKey(Aeronave, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('utilizador', 'aeronave')

    def __str__(self):
        return f"{self.utilizador.username} - {self.aeronave.nome}"


class Fotografia(models.Model):
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    imagem = models.ImageField(upload_to='fotografias/')
    legenda = models.CharField(max_length=200, blank=True)
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.utilizador.username} - {self.evento.nome}"


class Voto(models.Model):
    opcao = models.CharField(max_length=200)
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.opcao

class Voluntario(models.Model):
    nome = models.CharField(max_length=200)
    email = models.EmailField()
    telemovel = models.CharField(max_length=20)
    dias = models.CharField(max_length=200)
    data_candidatura = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome