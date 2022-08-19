from tkinter import CASCADE
from django.conf import settings

from email.policy import default
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import CharField, DateField, ImageField, IntegerField

from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    kakao_id = models.CharField(blank=True, max_length=100)
    email = models.EmailField(blank=True)    
    username = models.CharField(unique='True', null=True, max_length=100)
    access_token = models.CharField(null=True, max_length=255)
    refresh_token = models.CharField(null=True, max_length=255)
    password = models.CharField(null=True, max_length=100)
    
    def __str__(self):
        return self.username

# 작성자 이름으로 띄우기
# 페스티벌 좋아요
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    like_festival = models.ManyToManyField('Festival', blank=True, related_name='like_user')

    def __str__(self):
        return self.user
    

# 페스티벌
class Festival(models.Model):
    title = models.CharField(blank=True, max_length=1000)
    ticket_link = models.URLField(blank=True)
    Poster = models.ImageField(blank=True,null=True)
    time_start = models.DateField(blank=True)
    time_end = models.DateField(blank=True)
    place = models.CharField(blank=True,max_length=1000)
    ticket_open = models.DateField(blank=True)
    lineup = models.CharField(blank=True,max_length=1000)
    hits = models.IntegerField(blank=True,null=True)
    likes = models.ManyToManyField(
        User,
        related_name='like',
        blank=True
    )
 
    def __str__(self):
        return self.title    


# festival:place = 1:1
class Place(models.Model):
    # festival의 place를 fk로
    festival = models.ForeignKey(
        Festival, 
        on_delete=models.CASCADE, 
        related_name='place_festsival'
    )
    name = models.CharField(blank=True, max_length=20)
    name_address = models.CharField(blank=True, max_length=20) # 도로명주소
    land_address = models.CharField(blank=True, max_length=20) # 지번주소
    # parking = 이거 어떻게 지정해야되지?

    def __str__(self):
        return self.name


class Post(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE, 
        related_name='post_user'
    )
    festival = models.ForeignKey(
        Festival, 
        on_delete=models.CASCADE, 
        related_name='post_festsival'
    )
    title = models.TextField(blank=True)
    body = models.TextField(blank=True)
    image = models.ImageField(blank=True) 
    date = models.DateTimeField(auto_now_add=True)
    hits = models.IntegerField(blank=True)
    category = models.TextField(blank=True)
    #카테고리의 내역"후기", "친구 구하기", "티켓 양도", "정보 공유"

    def __str__(self):
        return self.title    
    

class Comment(models.Model):
    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='comment_user',
    )
    post = models.ForeignKey(
        Post, 
        null=True, 
        on_delete=models.CASCADE,
        related_name='comment_post'
    )
    comment = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment

class Option(models.Model):
    festival= models.ForeignKey(
        Festival, 
        on_delete=models.CASCADE, 
        related_name='option_festsival'
    )
    user= models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='option_user'
    )
    option1 = models.IntegerField(blank=True,default=0)
    option2 = models.IntegerField(blank=True,default=0)
    option3 = models.IntegerField(blank=True,default=0)
    option4 = models.IntegerField(blank=True,default=0)
    option5 = models.IntegerField(blank=True,default=0)
    option6 = models.IntegerField(blank=True,default=0)
       # user_id를 가져올 필요가 있어? >> 유저가 한 페스티벌에 여러번 특징작성 방지

class OptionCount(models.Model):
    # fesstival의 id를 fk로
    festival= models.OneToOneField(Festival, on_delete=models.CASCADE,primary_key=True)
    check_num=models.IntegerField(blank=True,default=0)
    option1 = models.IntegerField(blank=True,default=0)
    option2 = models.IntegerField(blank=True,default=0)
    option3 = models.IntegerField(blank=True,default=0)
    option4 = models.IntegerField(blank=True,default=0)
    option5 = models.IntegerField(blank=True,default=0)
    option6 = models.IntegerField(blank=True,default=0)
    
    @receiver(post_save, sender=Festival)
    def create_festival_optioncount(sender, instance, created, **kwargs):
        if created:
              OptionCount.objects.create(festival=instance)


