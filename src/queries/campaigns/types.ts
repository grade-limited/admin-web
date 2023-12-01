export type ICreateCampaign = {
  name: string;
  description?: string;
  cover_url?: string;
  thumbnail_url?: string;
  website_url?: string;
  is_active?: boolean;
  publish_date?: string;
  start_date?: string;
  end_date?: string;
  amount: number;
  amount_type: string;
  campaign_type?: string;
};

export type IUpdateCampaign = {
  name?: string;
  description?: string;
  cover_url?: string;
  thumbnail_url?: string;
  website_url?: string;
  is_active?: boolean;
  publish_date?: string;
  start_date?: string;
  end_date?: string;
  amount?: number;
  amount_type?: string;
  campaign_typev: string;
};
