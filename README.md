"# cleversite-electron"



Заходим на developer.apple.com
1) Регистрируем appId приложения
2) Регистрируем ключи
https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps
в крации -- заходим Утилиты/Связка ключей/ В меню выбираем, запросить сертификат у бюро. Сохраняем его на диск.
Далее нужно сгенерировать Девелопмент сертификат, Продакшен сертификат инсталлера, Продакшен сертификат дистрибьютера
Далее нужно зайти ПРовизионг, и там еще ключи поменять.
3) наше тестовое устройство, нужно зарегестрировать, узнать ИД устройтсоа можно (Xcode - Window - Device -- ID)

security find-identity -v -p codesigning ----- список сертификатов на устройстве
export CSC_LINK=https://cleversite.ru/cleversite/asdf.p12 --- генерируется в Утилиты-связка-экспорт
export CSC_KEY_PASSWORD=Rafail3434 -- пароль от ключа
export CSC_NAME=N5C7ST4F   --- "Mac Developer: Vitaly Kuzmin (N5C7ST4F)"
