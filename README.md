"# cleversite-electron"



1) Заходим в Утилиты/Связка ключей... В меню Связка ключей / Ассистент / Запросить сертификат у бюро
2) Заходим в Dev.apple -- Development -- делаем сертификат
3) Девайсес -- добавляем наш девайс (Xcode - Window - Device -- ID) --- делаем Reset
4) ProvisionProfiles - Development -- добавляем сертификат.

export CSC_LINK=file://Users/scloud/Documents/scloud.p12
export CSC_KEY_PASSWORD=Rafail123
CSC_PASSWORD
export CSC_NAME=ServiceCloud
unset CSC_LINK
CSC_LINK	The HTTPS link (or base64-encoded data, or file:// link) to certificate (*.p12 file).
CSC_KEY_PASSWORD	The password to decrypt the certificate given in CSC_LINK.
CSC_NAME	macOS-only Name of certificate (to retrieve from login.keychain). Useful on a development machine (not on CI) if you have several identities (otherwise don't specify it).

export CSC_NAME="Mac Developer: Vitaly Kuzmin (N5C7ST4F6D)"
