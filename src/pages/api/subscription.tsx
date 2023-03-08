import { createClient } from '@supabase/supabase-js';

interface Subscription {
  email: string;
  dateSubscribed: Date;
}

class SubscriptionService {
  private supabaseUrl: string;
  private supabaseKey: string;
  private subscriptions: Subscription[] = [];

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
  }

  async subscribe(email: string): Promise<boolean> {
    const subscriptionExists = this.subscriptions.some(
      (sub) => sub.email === email
    );
    if (subscriptionExists) {
      return false;
    }

    const newSubscription: Subscription = {
      email,
      dateSubscribed: new Date(),
    };
    this.subscriptions.push(newSubscription);

    const { data, error } = await createClient(this.supabaseUrl, this.supabaseKey)
      .from('subscriptions')
      .insert([{ email }]);

    if (error) {
      // Handle the error as needed.
      console.error(error);
      return false;
    }

    // Here you would send an email confirmation to the subscriber.

    return true;
  }

  async unsubscribe(email: string): Promise<boolean> {
    const subscriptionIndex = this.subscriptions.findIndex(
      (sub) => sub.email === email
    );
    if (subscriptionIndex === -1) {
      return false;
    }

    this.subscriptions.splice(subscriptionIndex, 1);

    const { data, error } = await createClient(this.supabaseUrl, this.supabaseKey)
      .from('subscriptions')
      .delete()
      .eq('email', email);

    if (error) {
      // Handle the error as needed.
      console.error(error);
      return false;
    }

    return true;
  }

  async getSubscriptions(): Promise<Subscription[]> {
    const { data, error } = await createClient(this.supabaseUrl, this.supabaseKey)
      .from('subscriptions')
      .select('email, dateSubscribed');

    if (error) {
      // Handle the error as needed.
      console.error(error);
      return [];
    }

    this.subscriptions = data.map((sub) => ({
      email: sub.email,
      dateSubscribed: new Date(sub.dateSubscribed),
    }));

    return [...this.subscriptions];
  }
}
