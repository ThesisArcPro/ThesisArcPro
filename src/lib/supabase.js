 import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rehvwvujuamehoanfomj.supabase.co'
const supabaseKey = 'sb_publishable_CKxnbue4T6cVn9BOIg8BkQ_kBNBiM_h'

export const supabase = createClient(supabaseUrl, supabaseKey)
