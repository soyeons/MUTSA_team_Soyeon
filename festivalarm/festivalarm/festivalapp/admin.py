from django.contrib import admin
from festivalapp.models import User, Post, Festival, Place, Comment, Option, OptionCount

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Festival)
admin.site.register(OptionCount)
admin.site.register(Place)
admin.site.register(Comment)
admin.site.register(Option)

