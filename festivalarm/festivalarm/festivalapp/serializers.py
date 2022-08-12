from rest_framework import serializers
from .models import OptionCount, User, Festival, Place, Post, Comment, Option ,Profile,OptionCount


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id','name']

class ProfileSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    
    class Meta:
        model= Profile
        fields=['id','user','nickname']


class FestivalSerializer(serializers.ModelSerializer):
    class Meta:
        model= Festival
        fields=['id','title','place', 'time_start', 'time_end','ticket_open','ticket_link','Poster','hits','lineup','likes']
        

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model= Place
        fields=['id','festival','name','name_adress','land_adress']
        
class PostSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(read_only=True)
    class Meta:
        model= Post
        fields=['id','author','profile','festival','title','body','image','date','hits','category']

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model= Post
        fields=['title','body','image','category']
        
class CommentSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(read_only=True)
    class Meta:
        model= Comment
        fields=['id','user','post','comment','date']
        
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Option
        fields=['id','festival','option1','option2','option3','option4','option5','option6']
          
class OptionCountSerializer(serializers.ModelSerializer):
    class Meta:
        model= OptionCount
        fields=['festival','option1','option2','option3','option4','option5','option6']
        

        
