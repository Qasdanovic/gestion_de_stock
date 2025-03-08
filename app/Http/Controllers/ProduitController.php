<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Models\Category;
use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produits = Produit::with('category')->paginate(10);

        return Inertia::render("Produit/Index",["produits"=>$produits]);
    }

    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $categories = Category::all();
        return Inertia::render("Produit/Create",compact("categories"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->validate([
            "nom_produit" => "required|min:4|max:25",
            "category_id" => "required|exists:categories,id",
            "prix_p" => "required|numeric|min:0",
            "photo" => "required|image|mimes:jpeg,png,jpg|max:2048",
            "code_barre" => "required|unique:produits,code_barre|string"
        ]) ;
            
        
        $image = $request->file("photo");
        
        $path = $image->store("products", "public");
        
        $data['photo'] = $path;
        Produit::create($data);
        
        return redirect()->route('produits.index')->with('success', 'Produit créé avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(Produit $produit)
    {
        
        return Inertia::render("Produit/Show" , ["produit"=>$produit]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produit $produit)
    {
        $categories = Category::all();


        return Inertia::render('Produit/Edit',compact("produit","categories"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduitRequest $request, Produit $produit)
    {
        
       $data =  $request->validated();
        
       if ($request->hasFile('photo')) {
            
            $request->validate([
               
                "photo" => "image|mimes:jpeg,png,jpg|max:2048",
            
            ]);
            
            $image = $request->file("photo");
        
            $path = $image->store("products", "public");
            
        
            $data['photo'] = $path;

        }    
        
        $produit->update($data);
        
        return redirect()->route('produits.index')->with('success', 'Produit modifiee avec succès');
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        $produit->delete();
        return redirect()->route('produits.index')->with('success', 'Produit supprimer avec succès');
    }
}
