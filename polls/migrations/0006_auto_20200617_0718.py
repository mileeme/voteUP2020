# Generated by Django 3.0.7 on 2020-06-17 07:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0005_auto_20200614_0534'),
    ]

    operations = [
        migrations.CreateModel(
            name='Election',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('date', models.DateField(verbose_name='date')),
            ],
            options={
                'ordering': ['date', 'name'],
            },
        ),
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ['number']},
        ),
        migrations.AddField(
            model_name='candidate',
            name='election',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='candidates', to='polls.Election'),
        ),
    ]
