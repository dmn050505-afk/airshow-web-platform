from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Piloto, Aeronave, Evento, UserProfile, Bilhete, Comentario, Avaliacao, Like, Fotografia, Voto, Voluntario


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PilotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Piloto
        fields = '__all__'


class AeronaveSerializer(serializers.ModelSerializer):
    piloto = PilotoSerializer(read_only=True)
    piloto_id = serializers.PrimaryKeyRelatedField(
        queryset=Piloto.objects.all(), source='piloto', write_only=True, allow_null=True
    )

    class Meta:
        model = Aeronave
        fields = '__all__'


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class BilheteSerializer(serializers.ModelSerializer):
    evento_nome = serializers.CharField(source='evento.nome', read_only=True)

    class Meta:
        model = Bilhete
        fields = '__all__'
        read_only_fields = ['utilizador', 'data_compra']


class ComentarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='utilizador.username', read_only=True)

    class Meta:
        model = Comentario
        fields = '__all__'
        read_only_fields = ['utilizador', 'data_publicacao']


class AvaliacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao
        fields = '__all__'
        read_only_fields = ['utilizador']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
        read_only_fields = ['utilizador']


class FotografiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fotografia
        fields = '__all__'
        read_only_fields = ['utilizador', 'data']

class VotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voto
        fields = '__all__'

class VoluntarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voluntario
        fields = '__all__'