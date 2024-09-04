
export interface DocsResponse{
    id?: number;
    title?: string;
    orgs?: OrgsResponse[];
    docs_type?: DocsTypeResponse[];
    file_size?: string;
    created_at?: Date;
    updated_at?: Date;
    file_uri?: string;
    extension?: string;
    is_active?: boolean;
}

export interface OrgsResponse{
    id?: number;
    kh_name?: string;
    en_name?: string;
}

export interface DocsTypeResponse{
    id?: number;
    name?: string;
}