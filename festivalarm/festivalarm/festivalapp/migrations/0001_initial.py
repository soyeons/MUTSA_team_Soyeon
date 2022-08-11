# Generated by Django 3.2.14 on 2022-07-29 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Festival',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=1000)),
                ('ticket_link', models.URLField(blank=True)),
                ('Poster', models.ImageField(blank=True, null=True, upload_to='')),
                ('time_start', models.DateField(blank=True)),
                ('time_end', models.DateField(blank=True)),
                ('place', models.CharField(blank=True, max_length=1000)),
                ('ticket_open', models.DateField(blank=True)),
                ('lineup', models.CharField(blank=True, max_length=1000)),
                ('hits', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='OptionCount',
            fields=[
                ('festival', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='festivalapp.festival')),
                ('check_num', models.IntegerField(blank=True, default=0)),
                ('option1', models.IntegerField(blank=True, default=0)),
                ('option2', models.IntegerField(blank=True, default=0)),
                ('option3', models.IntegerField(blank=True, default=0)),
                ('option4', models.IntegerField(blank=True, default=0)),
                ('option5', models.IntegerField(blank=True, default=0)),
                ('option6', models.IntegerField(blank=True, default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='festivalapp.user')),
                ('nickname', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(blank=True)),
                ('body', models.TextField(blank=True)),
                ('image', models.ImageField(blank=True, upload_to='')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('hits', models.IntegerField(blank=True)),
                ('category', models.TextField(blank=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_user', to='festivalapp.user')),
                ('festival', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_festsival', to='festivalapp.festival')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_profile', to='festivalapp.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=20)),
                ('name_address', models.CharField(blank=True, max_length=20)),
                ('land_address', models.CharField(blank=True, max_length=20)),
                ('festival', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='place_festsival', to='festivalapp.festival')),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option1', models.IntegerField(blank=True, default=0)),
                ('option2', models.IntegerField(blank=True, default=0)),
                ('option3', models.IntegerField(blank=True, default=0)),
                ('option4', models.IntegerField(blank=True, default=0)),
                ('option5', models.IntegerField(blank=True, default=0)),
                ('option6', models.IntegerField(blank=True, default=0)),
                ('festival', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='option_festsival', to='festivalapp.festival')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='option_user', to='festivalapp.user')),
            ],
        ),
        migrations.AddField(
            model_name='festival',
            name='likes',
            field=models.ManyToManyField(blank=True, to='festivalapp.User'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_user', to='festivalapp.user')),
                ('post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comment_post', to='festivalapp.post')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_profile', to='festivalapp.profile')),
            ],
        ),
    ]
