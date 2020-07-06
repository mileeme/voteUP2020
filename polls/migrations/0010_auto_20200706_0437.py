# Generated by Django 3.0.7 on 2020-07-06 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0009_auto_20200622_1341'),
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='candidate',
            name='profile_photo',
            field=models.ImageField(blank=True, null=True, upload_to='polls/'),
        ),
    ]