export interface TCustomError {
  statusCode?: number;
  message?: string;
}

export interface TCreateIsuee{
  title: string, 
  description: string, 
  type: string,
  user: string
}

export interface TPayload {
  title: string;
  description: string;
  type: string;
}

export interface TUser {
  id: number;
  name: string;
  role: string;
}

export interface TIssue {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  reporter_id: number;
  created_at: string;
  updated_at: string;
}

export interface TReporter {
  id: number;
  name: string;
  role: string;
}