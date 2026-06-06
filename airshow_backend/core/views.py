from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Piloto, Aeronave, Evento, UserProfile, Bilhete, Comentario, Avaliacao, Like, Fotografia, Voto, Voluntario
from .serializers import (UserSerializer, PilotoSerializer, AeronaveSerializer,
    EventoSerializer, UserProfileSerializer, BilheteSerializer,
    ComentarioSerializer, AvaliacaoSerializer, LikeSerializer, FotografiaSerializer, VotoSerializer, VoluntarioSerializer)
from django.views.decorators.csrf import csrf_exempt

#Autenticação

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'msg': 'username/password inválidos'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'msg': 'username já existe'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password)
    return Response({'msg': 'utilizador ' + user.username + ' criado'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'username': user.username, 'email': user.email, 'id': user.id})
    return Response({'msg': 'credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'msg': 'logout efetuado'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response({'username': request.user.username, 'email': request.user.email, 'id': request.user.id})


#Eventos

@api_view(['GET', 'POST'])
def eventos_view(request):
    if request.method == 'GET':
        eventos = Evento.objects.all()
        serializer = EventoSerializer(eventos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def evento_detail(request, pk):
    try:
        evento = Evento.objects.get(pk=pk)
    except Evento.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = EventoSerializer(evento)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EventoSerializer(evento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        evento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#Pilotos

@api_view(['GET', 'POST'])
def pilotos_view(request):
    if request.method == 'GET':
        pilotos = Piloto.objects.all()
        serializer = PilotoSerializer(pilotos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PilotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Aeronaves

@api_view(['GET', 'POST'])
def aeronaves_view(request):
    if request.method == 'GET':
        aeronaves = Aeronave.objects.all()
        serializer = AeronaveSerializer(aeronaves, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AeronaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Bilhetes

#@api_view(['GET', 'POST'])
#def bilhetes_view(request):
#    if request.method == 'GET':
#       bilhetes = Bilhete.objects.filter(utilizador=request.user)
        serializer = BilheteSerializer(bilhetes, many=True)
        return Response(serializer.data)
#    elif request.method == 'POST':
        serializer = BilheteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(utilizador=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def bilhetes_view(request):
    if request.method == 'GET':
        bilhetes = Bilhete.objects.filter(utilizador__username=request.data.get('username'))
        serializer = BilheteSerializer(bilhetes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        username = request.data.get('username')
        try:
            utilizador = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'msg': 'utilizador não encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = BilheteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(utilizador=utilizador)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Comentários

@api_view(['GET', 'POST'])
def comentarios_view(request):
    if request.method == 'GET':
        evento_id = request.query_params.get('evento')
        if evento_id:
            comentarios = Comentario.objects.filter(evento_id=evento_id)
        else:
            comentarios = Comentario.objects.all()
        serializer = ComentarioSerializer(comentarios, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        username = request.data.get('username')
        try:
            utilizador = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'msg': 'utilizador não encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ComentarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(utilizador=utilizador)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Avaliações

@api_view(['GET', 'POST'])
def avaliacoes_view(request):
    if request.method == 'GET':
        evento_id = request.query_params.get('evento')
        if evento_id:
            avaliacoes = Avaliacao.objects.filter(evento_id=evento_id)
        else:
            avaliacoes = Avaliacao.objects.all()
        serializer = AvaliacaoSerializer(avaliacoes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AvaliacaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(utilizador=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Likes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_toggle(request, aeronave_id):
    aeronave = Aeronave.objects.get(pk=aeronave_id)
    like, created = Like.objects.get_or_create(utilizador=request.user, aeronave=aeronave)
    if not created:
        like.delete()
        return Response({'liked': False})
    return Response({'liked': True})


#Fotografias

@api_view(['GET', 'POST'])
def fotografias_view(request):
    if request.method == 'GET':
        evento_id = request.query_params.get('evento')
        if evento_id:
            fotografias = Fotografia.objects.filter(evento_id=evento_id)
        else:
            fotografias = Fotografia.objects.all()
        serializer = FotografiaSerializer(fotografias, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FotografiaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(utilizador=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Voto

@api_view(['GET', 'POST'])
def votos_view(request):
    if request.method == 'GET':
        votos = Voto.objects.all()
        serializer = VotoSerializer(votos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = VotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Voluntário
@csrf_exempt
@api_view(['POST'])
def voluntarios_view(request):
    serializer = VoluntarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

