# Not Asistanı

El yazısıyla cevaplanmış matematik sınavlarını, öğretim elemanının onayladığı bir rubriğe göre Google Gemini yardımıyla puanlayan kişisel uygulama.

- **Web sürümü:** `https://KULLANICIADINIZ.github.io/not-asistani/`
- **Android sürümü:** Bu deponun **Releases** sayfasındaki en yeni `.apk` dosyası

Tüm veriler kullanıcının kendi cihazında kalır. Her kullanıcı kendi ücretsiz Gemini API anahtarını girer ([aistudio.google.com/apikey](https://aistudio.google.com/apikey)).

## Depodaki dosyalar

| Dosya | Görevi |
|---|---|
| `index.html` | Uygulamanın kendisi (web ve Android ortak) |
| `privacy.html` | Gizlilik politikası (Play Store bu sayfanın adresini ister) |
| `package.json`, `capacitor.config.json` | Android paketinin ayarları |
| `scripts/build-www.mjs` | Kütüphaneleri uygulamanın içine gömer |
| `assets/` | Uygulama simgesi ve açılış ekranı |
| `.github/workflows/android.yml` | GitHub'ın APK'yı otomatik derlemesini sağlar |

## Android APK nasıl üretilir?

`index.html` her güncellendiğinde GitHub Actions uygulamayı kendiliğinden derler ve **Releases** sayfasına yeni bir `.apk` koyar. Elle başlatmak için: **Actions → Android uygulamasını derle → Run workflow**.

Derlemenin imzalı ve güncellenebilir olması için **Settings → Secrets and variables → Actions** altında dört gizli değer tanımlı olmalı: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`. Bunlar yoksa geçici bir test APK'sı üretilir.

## Telefona kurulum

1. Telefondan deponun **Releases** sayfasını açın, en üstteki sürümün `.apk` dosyasına dokunun.
2. İndirme bitince dosyayı açın. İlk seferde "Bu kaynaktan yüklemeye izin ver" onayı istenir.
3. **Yükle**'ye dokunun. Yeni sürümler aynı şekilde eski sürümün üzerine kurulur; veriler korunur.

Kaydedilen Excel, rubrik ve yedek dosyaları telefonda **Belgeler › Not Asistani** klasöründe bulunur.

## Google Play'e yükleme (isteğe bağlı)

1. [play.google.com/console](https://play.google.com/console) üzerinden geliştirici hesabı açın (tek seferlik ücret).
2. Yeni uygulama oluşturun. Paket adı: `com.notasistani.app`
3. **Actions** sekmesindeki son başarılı derlemenin sayfasından `play-store-aab` paketini indirin ve içindeki `.aab` dosyasını **Kapalı test** kanalına yükleyin.
4. Gizlilik politikası adresi: `https://KULLANICIADINIZ.github.io/not-asistani/privacy.html`
5. Yeni kişisel hesaplarda üretime geçmeden önce en az 12 test kullanıcısıyla 14 gün kapalı test gerekir.
