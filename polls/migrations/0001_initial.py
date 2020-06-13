# Generated by Django 3.0.7 on 2020-06-13 06:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('f_name', models.CharField(blank=True, max_length=60, null=True)),
                ('l_name', models.CharField(blank=True, max_length=60, null=True)),
                ('profile_photo', models.ImageField(blank=True, null=True, upload_to='polls')),
            ],
            options={
                'ordering': ['f_name', 'l_name'],
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_id', models.PositiveIntegerField(blank=True, null=True, verbose_name='question id')),
                ('question', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ['question'],
            },
        ),
        migrations.CreateModel(
            name='Response',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('response_id', models.PositiveIntegerField(blank=True, null=True, verbose_name='response id')),
                ('response', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='polls.Candidate')),
                ('question', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='polls.Question')),
            ],
            options={
                'ordering': ['candidate', 'response_id'],
            },
        ),
    ]
