// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 URL과 공개 API 키
const supabaseUrl = 'https://vmswxqpplehaedyndokq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtc3d4cXBwbGVoYWVkeW5kb2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMDU1NzksImV4cCI6MjA0MTc4MTU3OX0.cud_CkOCORedES7QR3pFzLqPQAlKQgRxc55h9kXFcFA';

export const supabase = createClient(supabaseUrl, supabaseKey);
