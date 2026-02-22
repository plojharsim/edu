# 📧 Šablony pro Supabase Emaily

Tyto šablony vlož do svého **Supabase Dashboardu** v sekci:
**Authentication -> Email Templates**

## 1. Potvrzení registrace (Confirm Signup)
**Předmět:** Vítej v Edu | by plojharsim 🎓 Potvrď svůj e-mail

```html
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #f8fafc; border-radius: 40px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="background-color: #4f46e5; width: 60px; height: 60px; border-radius: 18px; display: inline-block; padding: 15px; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.2);">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
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
    <div style="background-color: #4f46e5; width: 60px; height: 60px; border-radius: 18px; display: inline-block; padding: 15px;">
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z"/></svg>
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