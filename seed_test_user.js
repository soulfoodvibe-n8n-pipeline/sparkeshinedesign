const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seedTestData() {
  console.log("Starting DB Seed Process...");

  const testEmail = "vip@example.com";
  const testPassword = "Sparkle2026!";

  // 1. Create User in auth.users
  console.log(`Creating user ${testEmail}...`);
  const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email: testEmail,
    password: testPassword,
    email_confirm: true // bypass email verification
  });

  if (userError) {
    if (userError.message.includes('already registered')) {
        console.log("User already exists! Deleting and recreating for clean slate...");
        const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
        const userToDel = existingUser.users.find(u => u.email === testEmail);
        if(userToDel) await supabaseAdmin.auth.admin.deleteUser(userToDel.id);
        
        // Re-run
        return seedTestData();
    }
    console.error("Error creating user:", userError);
    return;
  }

  const userId = userData.user.id;
  console.log("User created! ID:", userId);

  // 2. Create Client Profile
  console.log("Creating Client Profile...");
  const { data: clientData, error: clientError } = await supabaseAdmin
    .from('clients')
    .insert([
      {
        user_id: userId,
        first_name: "Sarah",
        last_name: "Smith",
        email: testEmail,
        phone: "555-0199"
      }
    ])
    .select()
    .single();

  if (clientError) {
    console.error("Error creating client:", clientError);
    return;
  }

  const clientId = clientData.id;
  console.log("Client created! ID:", clientId);

  // 3. Create Event
  console.log("Creating Event...");
  const { data: eventData, error: eventError } = await supabaseAdmin
    .from('events')
    .insert([
      {
        client_id: clientId,
        slug: "smith-wedding-2026",
        title: "Sarah & John's Wedding",
        event_date: "2026-09-15T18:00:00Z",
        location: "The Grand Plaza, Orlando FL"
      }
    ])
    .select()
    .single();

  if (eventError) {
    console.error("Error creating event:", eventError);
    return;
  }

  const eventId = eventData.id;
  console.log("Event created! ID:", eventId);

  // 4. Create dummy RSVPs
  console.log("Injecting dummy RSVPs...");
  await supabaseAdmin.from('rsvps').insert([
    { event_id: eventId, guest_name: "Uncle Bob & Aunt Mary", email: "bob@test.com", attending: true, party_size: 2, dietary_needs: "none" },
    { event_id: eventId, guest_name: "Cousin Timmy", attending: true, party_size: 1, dietary_needs: "vegan", special_notes: "Very excited!" },
    { event_id: eventId, guest_name: "The Johnsons", attending: false, party_size: 0, dietary_needs: "none", special_notes: "So sorry we can't make it!" }
  ]);

  // 5. Create dummy gallery images
  console.log("Injecting dummy Gallery Images...");
  await supabaseAdmin.from('gallery_images').insert([
    { event_id: eventId, image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop", is_approved: true },
    { event_id: eventId, image_url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop", is_approved: true },
    { event_id: eventId, image_url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop", is_approved: false },
    { event_id: eventId, image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop", is_approved: false }
  ]);

  console.log("\n====================================");
  console.log("SUCCESS! Here are your login credentials:");
  console.log(`Email: ${testEmail}`);
  console.log(`Password: ${testPassword}`);
  console.log("====================================\n");
}

seedTestData();
