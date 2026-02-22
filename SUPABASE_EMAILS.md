# 📧 Šablony pro Supabase Emaily

Tyto šablony vlož do svého **Supabase Dashboardu** v sekci:
**Authentication -> Email Templates**

## 1. Potvrzení registrace (Confirm Signup)
**Předmět:** Vítej v Edu | by plojharsim 🎓 Potvrď svůj e-mail

```html
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #f8fafc; border-radius: 40px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="background-color: #4f46e5; width: 60px; height: 60px; border-radius: 18px; display: inline-block; line-height: 60px; text-align: center; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.2);">
      <span style="font-size: 30px; color: white;">✨</span>
    </div>
  </div>
  
  <div style="background-color: white; padding: 40px; border-radius: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <h1 style="color: #1e293b; font-size: 24px; font-weight: 900; text-align: center; margin-bottom: 10px;">Vítej v aplikaci!</h1>
    <p style="color: #64748b; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
      Tvůj účet byl úspěšně vytvořen. Už tě dělí jen jeden klik od toho, aby ses začal učit chytřeji.
    </p>
    
    <div style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" style="background-color: #4f46e5; color: white; padding: 16px 32px; border-radius: 16px; text-decoration: none; font-weight: 800; font-size: 16px; display: inline-block;">
        Potvrdit e-mail a začít
      </a>
    </div>
  </div>
  
  <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
    Edu | by plojharsim
  </p>
</div>
```

## 2. Obnova hesla (Reset Password)
**Předmět:** Obnova hesla pro Edu | by plojharsim

```html
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #f8fafc; border-radius: 40px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="background-color: #4f46e5; width: 60px; height: 60px; border-radius: 18px; display: inline-block; line-height: 60px; text-align: center;">
       <span style="font-size: 30px; color: white;">🔑</span>
    </div>
  </div>
  
  <div style="background-color: white; padding: 40px; border-radius: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <h1 style="color: #1e293b; font-size: 24px; font-weight: 900; text-align: center; margin-bottom: 10px;">Zapomenuté heslo?</h1>
    <p style="color: #64748b; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
      Dostali jsme žádost o obnovu hesla. Pokud jsi to nebyl ty, můžeš tento e-mail klidně ignorovat.
    </p>
    
    <div style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" style="background-color: #4f46e5; color: white; padding: 16px 32px; border-radius: 16px; text-decoration: none; font-weight: 800; font-size: 16px; display: inline-block;">
        Obnovit heslo
      </a>
    </div>
  </div>
  
  <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
    Edu | by plojharsim
  </p>
</div>