document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {id: 1, name: 'Robusta Brazil', img: 'coffe1.jpg', price: 20000},
            {id: 2, name: 'Arabica Blend', img: 'coffe2.jpg', price: 25000},
            {id: 3, name: 'Primo Passo', img: 'coffe3.jpg', price: 30000},
            {id: 4, name: 'Aceh Gayo', img: 'coffe4.jpg', price: 25000},
            {id: 5, name: 'Sumatra Mandheling', img: 'coffe5.jpg', price: 20000},
        ],
    }));


    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem){
            // cekk apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === item.id)

            // jika belum ada / cart kosong
            if (!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity ++;
                this.total += newItem.price;
            } else{
                // jika barang sudah ada / cart berisi, cek apakah barang beda atau sama
                this.items = this.items.map((item) => {
                    // jika barang tidak sama
                    if (item.id != newItem.id) {
                        return item;
                    } else {
                        // jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity ++;
                        item.total = item.price * item.quantity;
                        this.quantity ++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id){
            // cekk item yang mau di remove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id );

            // jika item lebih dari satu
            if (cartItem.quantity > 1) {
                // telusuri 1 1 
                this.items = this.items.map((item) => {
                    //jika bukan barang yang di klil
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity --;
                        item.total = item.price * item.quantity;
                        this.quantity --;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                // jika barang sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity --;
                this.total -= cartItem.price;
            }
        }
    });
});

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};