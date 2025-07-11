import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';
export const useSellerAuthStore = create((set,get) => ({
    authSeller:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth: async()=>{
        try {
            // set({isCheckingAuth:true})
            const response =await axiosInstance.get('/seller/sellerInfo')
            set({authSeller:response.data})
            return response.data
        } catch (error) {
            console.log(error)
            set({authSeller:null})
            throw(error)
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup: async (formData) => {
        set({isSigningUp:true})
        try {
            const response = await axiosInstance.post('/seller/signup',formData)
            toast.success("Account created successfully")
            set({authSeller:response.data})
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            throw(error)
        }
        finally{
            set({isSigningUp:false})
        }
        
    },
    logout: async()=>{
        try {
            await axiosInstance.post('/seller/logout')
            set({authSeller:null})
            toast.success("Logged out successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            throw(error)
        }
    },
    login: async(formData)=>{
        set({isLoggingIn:true})
        try {
            const response = await axiosInstance.post('/seller/login',formData)
            set({authSeller:response.data})
            // toast.success("Logged in successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            throw error
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile: async(formData)=>{
        set({isUpdatingProfile:true})
        try {
            const response = await axiosInstance.post('/seller/edit-profile',formData)
            set({authSeller:response.data})
            toast.success("Profile updated successfully")
            const updatedSeller= response.data.updatedUserData
            set({ authSeller: updatedSeller });
            return {updatedSeller}
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },
    addProduct: async(formData)=>{
        try {
            const res=await axiosInstance.post('/product/addProduct',formData)
            return res.data
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            throw error
            
        }
    },
   

}))