@component('mail::message')

# ⚠️ Animal Detection Alert

An animal has been detected by the monitoring camera.

### **Animal:** {{ $animal }}
### **Confidence:** {{ $confidence }}%
### **Detected At:** {{ $timestamp }}

@if($image)
![Animal Image]({{ $image }})
@endif

@component('mail::button', ['url' => env('APP_URL')])
View Dashboard
@endcomponent

Stay alert,  
**Animo Monitoring System**

@endcomponent
