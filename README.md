# create-accout-helper-extension
![Иллюстрация к проекту](https://github.com/webRuslanZ/docs/raw/main/split-names.png)  <br/>

## Расширение для Chrome, Firefox. <br/>
* Формирует имя для аккаунта, в формате "Your Name" в  "y.name" | "name.y" | "your.name" <br/>
* Генерирует рандомный пароль из 8, 10, 12, 16 символов
Для Chrome удалить из манифеста следующее:
```json
 "browser_specific_settings": {
        "gecko": {
            "id": "split-names-for-ad@local"
        }
    },
```

