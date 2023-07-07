export function getMeetingFormData(form: FormData) {
    const guestList = form.get('guest-email')
    return {
      name: form.get('name') as string,
      email: form.get('email') as string,
      location: form.get('location') as string,
      notes: form.get('notes'),
      guests: guestList ?[guestList]: null,
    };
  }
  