# Generated by Django 5.0.3 on 2024-11-19 14:39

import api.base_objects
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('nomenclatures', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', api.base_objects.UUIDPKField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='Уникальный идентификатор')),
                ('parameters', models.JSONField(blank=True, null=True, verbose_name='Параметры')),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'BGMUSIC'), (1, 'BGVIDEO'), (2, 'BGIMAGE'), (3, 'TICKER'), (4, 'AD'), (5, 'CANCEL_BGMUSIC'), (6, 'CANCEL_BGVIDEO'), (7, 'CANCEL_BGIMAGE'), (8, 'CANCEL_TICKER'), (9, 'CANCEL_AD'), (10, 'UPDATE_BGMUSIC'), (11, 'UPDATE_BGVIDEO'), (12, 'UPDATE_BGIMAGE'), (13, 'UPDATE_TICKER'), (14, 'UPDATE_AD'), (15, 'REBOOT'), (16, 'UPDATE'), (17, 'CUSTOM'), (18, 'SET_PARAMETERS'), (19, 'PLACEHOLDER')], default=0, editable=False, verbose_name='Тип')),
                ('status', models.PositiveSmallIntegerField(choices=[(0, 'Ожидает обработки'), (1, 'В обработке'), (2, 'Выполнена'), (3, 'Отменена'), (4, 'Ошибка')], default=0, verbose_name='Статус')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Время создания')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Время выполнения')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='tasks', to='nomenclatures.nomenclature', verbose_name='Целевая рабочая станция')),
            ],
            options={
                'verbose_name': 'Репликация',
                'verbose_name_plural': 'Репликации',
                'db_table': 'task',
                'ordering': ('-created',),
            },
        ),
    ]