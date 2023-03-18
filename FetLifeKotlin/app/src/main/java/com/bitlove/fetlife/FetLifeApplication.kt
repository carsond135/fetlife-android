package com.bitlove.fetlife

import android.annotation.SuppressLint
import android.app.*
import android.arch.lifecycle.ViewModel
import android.arch.lifecycle.ViewModelProviders



class FetLifeApplication : Application() {

    companion object {
        lateinit var instance : FetLifeApplication
    }

    var loggedInUser: User? = null

}