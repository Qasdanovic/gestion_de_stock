import React, { useEffect, useState } from 'react'
import { useForm, Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function Edit({errors, categories,produit}) {

    const { data, setData, post, processing } = useForm({
        "nom_produit": produit.nom_produit,
        "category_id": produit.category_id,
        "prix_p": produit.prix_p,
        "photo" : null,
        "code_barre": produit.code_barre,
    });


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("photo", file);
      };

      
    const formHandling = (e) => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append("nom_produit", data.nom_produit);
        formData.append("prix_p", data.prix_p);
        formData.append("category_id", data.category_id);
        // formData.append("photo", data.photo);
        if (data.photo) {
            formData.append("photo", data.photo);
        }

        formData.append("code_barre", data.code_barre);

        formData.append("_method", "PUT");

        // // return console.log(formData)
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ':', pair[1]);
        // }
        

        

        post(route('produits.update', produit.id), formData, {
            forceFormData: true,
        });
    }
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    <i className="fas fa-folder-open mr-2"></i>Edit produit
                </h2>
            }
        >
            <Head title="Category" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <form onSubmit={formHandling} className="space-y-6"  encType="multipart/form-data">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-2">
                                        <label htmlFor="nom_produit" className="text-sm font-medium text-gray-700">
                                            nom produit
                                        </label>
                                        <input 
                                            type="text" 
                                            id="nom_produit"
                                            name="nom_produit" 
                                            value={data.nom_produit || ''} 
                                            onChange={(e) => setData('nom_produit', e.target.value) }
                                            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.nom_produit ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter nom produit"
                                        />
                                        {errors.nom_produit && <div className="text-sm text-red-600">{errors.nom_produit}</div>}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="prix_p" className="text-sm font-medium text-gray-700">
                                            prix produit
                                        </label>
                                        <input
                                            type="text"
                                            id="prix_p"
                                            name="prix_p"
                                            value={data.prix_p || ''}
                                            onChange={(e) => setData('prix_p', e.target.value)}
                                            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.prix_p ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter prix de produit"
                                        />
                                        {errors.prix_p && <div className="text-sm text-red-600">{errors.prix_p}</div>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="category" className="text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <select onChange={(e) => setData("category_id", e.target.value)} name="category_id" id="category" className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.category_id ? 'border-red-500' : 'border-gray-300'}`}
                                        >
                                            <option value="">choisir un categorie :</option>
                                            {
                                                categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id} selected={cat.id === produit.category_id} >{cat.nom_cat}</option>
                                                ))
                                            }
                                        </select>
                                        {errors.category_id && <div className="text-sm text-red-600">{errors.category_id}</div>}
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="photo" className="text-sm font-medium text-gray-700">
                                            Photo
                                        </label>
                                        <input 
                                            type="file" 
                                            id="photo"
                                            name="photo" 
                                            onChange={(e) => handleFileChange(e)}
                                            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.photo ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter category name"
                                        />
                                        {errors.photo && <div className="text-sm text-red-600">{errors.photo}</div>}
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="code_barre" className="text-sm font-medium text-gray-700">
                                            code barre
                                        </label>
                                        <input 
                                            type="number" 
                                            id="code_barre"
                                            name="code_barre" 
                                            value={data.code_barre || ''} 
                                            onChange={(e) => setData('code_barre', e.target.value)}
                                            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.code_barre ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Enter category name"
                                        />
                                        {errors.code_barre && <div className="text-sm text-red-600">{errors.code_barre}</div>}
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className={`w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {processing ? 'Creating...' : 'Edit Category'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit
