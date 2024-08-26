import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../Context/productsContext";
import { Carousel } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { WishlistContext } from "../../Context/Wishlist";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { CategoriesContext } from "../../Context/CategoriesContext";

export default function ProductsInCategory() {
  const { getProductInCategory } = useContext(CategoriesContext);
  const { wishlist, getWishlist, addToWishList } = useContext(WishlistContext);
  const { userCart, getUserCart, addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProductsIsEmpty, setFilteredProductsIsEmpty] = useState(false);
  const { categoryId } = useParams();

  //  handel get all products
  async function handelgetproducts() {
    try {
      const response = await getProductInCategory(categoryId);
      await setProducts(response?.data?.data);

      console.log(products);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  // handel get cart And wishList
  async function handelGetCartAndWishlist() {
    try {
      if (localStorage.getItem("userToken")) {
        await getWishlist();
        await getUserCart();
      }
    } catch (err) {}
  }

  // handel add to cart
  async function HandelAddToCart(productId) {
    try {
      if (localStorage.getItem("userToken")) {
        await addToCart(productId);
        await getUserCart();
        toast.success(" Product added to cart");
      } else {
        toast.error("please login first");
      }
    } catch (err) {
    } finally {
    }
  }

  // handel add to wishlist
  async function HandelAddToWishList(productId) {
    try {
      if (localStorage.getItem("userToken")) {
        await addToWishList(productId);
        await getWishlist();
        toast.success(" Product added to wishList");
      } else {
        toast.error("please login first");
      }
    } catch (err) {
    } finally {
    }
  }

  // handel sort products
  function handelSortProducts(e) {
    const sortedProducts = [...products].sort((a, b) => {
      switch (e.target.value) {
        case "low-price":
          return a.price - b.price;
        case "high-price":
          return b.price - a.price;
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        case "high-rating":
          return b.ratingsAverage - a.ratingsAverage;
        case "low-rating":
          return a.ratingsAverage - b.ratingsAverage;
        case "best-seller":
          return b.sold - a.sold;
        default:
          return 0;
      }
    });
    setFilteredProducts(sortedProducts);
  }

  // handel search products
  function handelSearchProducts(e) {
    setFilteredProductsIsEmpty(false);

    if (e.target.value == "") {
      setFilteredProducts(filteredProducts);
    }
    const searchedProducts = products.filter((product) =>
      product.title
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase().trim())
    );
    if (searchedProducts.length == 0) {
      setFilteredProductsIsEmpty(true);
    } else {
      setFilteredProductsIsEmpty(false);
    }
    setFilteredProducts(searchedProducts);
  }

  // fetch data will component mount
  useEffect(() => {
    handelgetproducts();
    if (localStorage.getItem("userToken")) {
      handelGetCartAndWishlist();
    }
  }, []);

  
  if (isLoading) {
      return (
          <div className="w-full h-screen flex items-center justify-center">
        <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
      </div>
    );
}
if (products.length == 0  ) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-3xl font-bold">No Products Found</p>
    </div>
  );
}

  return (
    <div className="shop-layout flex  flex-col h-screen lg:pt-28 pt-[60px] ">
      <div className="sideBar w-[84%] my-5 rounded-xl mx-auto bg-black text-white   py-5  ">
        <div className="container w-[100%] px-5 mx-auto flex  lg:flex-row flex-col-reverse  gap-6 lg:gap-20 justify-center lg:justify-start items-start lg:items-center">
          <div className="filters flex  flex-col gap-5 ps-1">
            <div className="filter flex gap-4 items-center">
              <p className="font-medium text-[17px]">
                <i class="fa-solid fa-arrow-down-wide-short"></i> Sort By
              </p>
              <select
                name="filter-by"
                onChange={handelSortProducts}
                id=""
                className="w-fit  text-black rounded-full py-1 ps-3 pe-5  ">
                <option value="high-price">High Price</option>
                <option value="low-price">Low Price</option>
                <option value="high-rating">High Rating</option>
                <option value="low-rating">Low Rating</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="best-seller">Best Seller</option>
              </select>
            </div>
          </div>
          <div className="searchBar w-[100%] lg:w-[45%] h-fit justify-center relative  lg:flex">
            <input
              className="px-4 py-3 h-fit w-[100%] rounded-full outline-none border text-black border-gray-400"
              type="text"
              onKeyUp={handelSearchProducts}
              placeholder="Search for products "
            />
          </div>
        </div>
      </div>
      <div className="container px-1   w-[96%]  mx-auto pb-14  ">
        <div className="resulte px-5  mt-10 mb-5">
          <h3 className="text-gray-700 text-xl">
            (
            {!filteredProductsIsEmpty
              ? filteredProducts?.length ||
                products?.length || (
                  <i className="fas fa-spinner fa-spin text-[18px]"></i>
                )
              : 0}
            ) Resulte
          </h3>
        </div>
        {filteredProductsIsEmpty ? (
          <div className="text-center">No Resulte</div>
        ) : (
          <div className="content w-full overflow-auto mx-auto gap-y-14 flex flex-wrap justify-center md:justify-start">
            {filteredProducts.length > 0 &&
              filteredProducts?.map((item) => {
                const isInWishlist =
                  wishlist?.data?.some((product) => product.id === item.id) ||
                  false;
                const isInCart =
                  userCart?.data?.products?.some(
                    (product) => product.product.id === item.id
                  ) || false;
                return (
                  <div
                    key={item.id}
                    className="card-container px-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-[85%] ">
                    <div className="product-card shadow-xl group bg-gray-100 rounded-xl overflow-hidden w-full  transition-all duration-300">
                      <div className="card-img relative flex items-center justify-center w-full p-0 sm:h-[250px] md:h-[300px] h-[250px] lg:h-[300px] overflow-hidden">
                        <button
                          disabled={isInWishlist}
                          onClick={() => {
                            HandelAddToWishList(item.id);
                          }}
                          className={`absolute top-4 text-[25px] right-4 z-30 ${
                            isInWishlist ? "text-red-700" : ""
                          }`}>
                          {isInWishlist ? (
                            <i class="fa-solid fa-heart"></i>
                          ) : (
                            <i class="fa-regular fa-heart"></i>
                          )}
                        </button>

                        {item.priceAfterDiscount && (
                          <div className="bg-red-700 z-50 w-[125px] h-[40px] absolute top-[10px] left-[-35px] rotate-[-45deg] flex justify-center items-center text-white">
                            Sale
                          </div>
                        )}
                        <Carousel
                          className="w-full mx-auto h-full  overflow-hidden"
                          navigation={false}
                          loop={true}>
                          {item.images.map((image, index) => (
                            <Link to={`/product/${item.id}`}>
                              <img
                                key={index}
                                src={image}
                                className="object-cover w-full h-full"
                                alt={`image ${index + 1}`}
                              />
                            </Link>
                          ))}
                        </Carousel>
                      </div>
                      <div className="card-body px-3 py-5 h-[180px]">
                        <h2 className="card-category mb-1 hover:underline text-blue-700 ">
                          {item.category.name}
                        </h2>
                        <Link to={`/product/${item.id}`}>
                          <h2 className="card-title mb-1 hover:underline">
                            {item.title ? (
                              item.title.split(" ").slice(0, 3).join(" ")
                            ) : (
                              <Skeleton width={200} />
                            )}
                          </h2>
                        </Link>
                        <div className="product-rateing my-[3px]">
                          <p>
                            <i class="fa-solid fa-star me-1 text-yellow-600"></i>
                            {item.ratingsAverage} ( {item.ratingsQuantity})
                          </p>
                        </div>
                        <div className="card-footer flex justify-between items-center">
                          {item.priceAfterDiscount ? (
                            <p className="card-price flex items-center text-lg font-bold">
                              ${item.priceAfterDiscount}
                              <s className="text-gray-600 text-sm ms-1  font-normal ">
                                ${item.price}
                              </s>
                            </p>
                          ) : (
                            <p>${item.price}</p>
                          )}
                          <button
                            disabled={isInCart}
                            onClick={() => {
                              localStorage.getItem("userToken") &
                                HandelAddToCart(item.id);
                            }}
                            className="  text-[35px] mr-4   flex justify-center items-center">
                            {isInCart ? (
                              <i class="fa-solid fa-circle-check"></i>
                            ) : (
                              <i class="fa-solid fa-circle-plus"></i>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {products &&
              filteredProducts.length < 1 &&
              products?.map((item) => {
                const isInWishlist =
                  wishlist?.data?.some((product) => product.id === item.id) ||
                  false;
                const isInCart =
                  userCart?.data?.products?.some(
                    (product) => product.product.id === item.id
                  ) || false;
                return (
                  <div
                    key={item.id}
                    className="card-container px-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-[85%] ">
                    <div className="product-card shadow-xl group bg-gray-100 rounded-xl overflow-hidden w-full  transition-all duration-300">
                      <div className="card-img relative flex items-center justify-center w-full p-0 sm:h-[250px] md:h-[300px] h-[250px] lg:h-[300px] overflow-hidden">
                        <button
                          disabled={isInWishlist}
                          onClick={() => {
                            HandelAddToWishList(item.id);
                          }}
                          className={`absolute top-4 text-[25px] right-4 z-30 ${
                            isInWishlist ? "text-red-700" : ""
                          }`}>
                          {isInWishlist ? (
                            <i class="fa-solid fa-heart"></i>
                          ) : (
                            <i class="fa-regular fa-heart"></i>
                          )}
                        </button>

                        {item.priceAfterDiscount && (
                          <div className="bg-red-700 z-50 w-[125px] h-[40px] absolute top-[10px] left-[-35px] rotate-[-45deg] flex justify-center items-center text-white">
                            Sale
                          </div>
                        )}
                        <Carousel
                          className="w-full mx-auto h-full  overflow-hidden"
                          navigation={false}
                          loop={true}>
                          {item.images.map((image, index) => (
                            <Link to={`/product/${item.id}`}>
                              <img
                                key={index}
                                src={image}
                                className="object-cover w-full h-full"
                                alt={`image ${index + 1}`}
                              />
                            </Link>
                          ))}
                        </Carousel>
                      </div>
                      <div className="card-body px-3 py-5 h-[180px]">
                        <h2 className="card-category mb-1 hover:underline text-blue-700 ">
                          {item.category.name}
                        </h2>
                        <Link to={`/product/${item.id}`}>
                          <h2 className="card-title mb-1 hover:underline">
                            {item.title ? (
                              item.title.split(" ").slice(0, 3).join(" ")
                            ) : (
                              <Skeleton width={200} />
                            )}
                          </h2>
                        </Link>
                        <div className="product-rateing my-[3px]">
                          <p>
                            <i class="fa-solid fa-star me-1 text-yellow-600"></i>
                            {item.ratingsAverage} ( {item.ratingsQuantity})
                          </p>
                        </div>
                        <div className="card-footer flex justify-between items-center">
                          {item.priceAfterDiscount ? (
                            <p className="card-price flex items-center text-lg font-bold">
                              ${item.priceAfterDiscount}
                              <s className="text-gray-600 text-sm ms-1  font-normal ">
                                ${item.price}
                              </s>
                            </p>
                          ) : (
                            <p>${item.price}</p>
                          )}
                          <button
                            disabled={isInCart}
                            onClick={() => {
                              localStorage.getItem("userToken") &
                                HandelAddToCart(item.id);
                            }}
                            className="  text-[35px] mr-4   flex justify-center items-center">
                            {isInCart ? (
                              <i class="fa-solid fa-circle-check"></i>
                            ) : (
                              <i class="fa-solid fa-circle-plus"></i>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
