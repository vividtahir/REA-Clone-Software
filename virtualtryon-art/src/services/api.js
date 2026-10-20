const API_BASE = '/api';

export async function initUser() {
  try {
    const res = await fetch(`${API_BASE}/user/first-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: localStorage.getItem('vton_user_id') || undefined })
    });
    const data = await res.json();
    if (data.userId) {
      localStorage.setItem('vton_user_id', data.userId);
    }
    return data;
  } catch (err) {
    console.error('Failed to init user:', err);
    return { credits: 2, userId: 'local_user' };
  }
}

export async function uploadImage(base64Data, filename = 'upload.jpg') {
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64Data, filename })
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export async function generateImage(formState, userId = 'anon_user') {
  const res = await fetch(`${API_BASE}/generate/image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formState,
      user_id: userId,
      is_public: formState.is_public ?? true
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.errorMessage || 'Generation failed');
  }
  return res.json();
}

export async function pollBatchStatus(batchId) {
  const res = await fetch(`${API_BASE}/generate/batch/status?batchId=${encodeURIComponent(batchId)}`);
  if (!res.ok) throw new Error('Status poll failed');
  return res.json();
}

export async function pollTaskStatus(uid) {
  const res = await fetch(`${API_BASE}/generate/status?uid=${encodeURIComponent(uid)}`);
  if (!res.ok) throw new Error('Task poll failed');
  return res.json();
}

export async function importProductImages(urls) {
  const res = await fetch(`${API_BASE}/import/product-images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urls })
  });
  if (!res.ok) throw new Error('Failed to import product images');
  return res.json();
}

export async function fetchReferenceImages() {
  const res = await fetch(`${API_BASE}/works/reference-images`);
  if (!res.ok) throw new Error('Failed to fetch reference images');
  return res.json();
}
