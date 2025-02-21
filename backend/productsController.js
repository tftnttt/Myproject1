import { supabase } from './supabaseClient.js';

export async function getProducts(req, res) {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

export async function addProduct(req, res) {
    const { name, description, price, image_url } = req.body;
    const { data, error } = await supabase.from('products').insert([{ name, description, price, image_url }]);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}
