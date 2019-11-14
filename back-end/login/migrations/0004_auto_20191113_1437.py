# Generated by Django 2.2.6 on 2019-11-13 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0003_auto_20191113_1433'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='firstname',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AddField(
            model_name='user',
            name='lastname',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(default='', max_length=40),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=40),
        ),
    ]