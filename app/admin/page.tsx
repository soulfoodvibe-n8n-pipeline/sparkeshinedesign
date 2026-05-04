import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const supabase = await createClient();

  // 1. Authenticate User
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/admin/login');
  }

  // Optional: In a real app, check if user.email is exactly Angie's email.
  // For testing, we let the VIP test user in as admin.

  // 2. Fetch all clients
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  // 3. Fetch all events with their balances
  const { data: events } = await supabase
    .from('events')
    .select('*, clients(first_name, last_name)')
    .order('created_at', { ascending: false });

  // Calculate total pending revenue
  const totalRevenue = events?.reduce((sum, event) => sum + (Number(event.balance_due) || 0), 0) || 0;

  return (
    <AdminClient 
      user={user} 
      clients={clients || []} 
      events={events || []} 
      totalRevenue={totalRevenue} 
    />
  );
}
