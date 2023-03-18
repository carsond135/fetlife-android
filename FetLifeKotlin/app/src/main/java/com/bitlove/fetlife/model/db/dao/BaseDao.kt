package com.bitlove.fetlife.model.db.dao

import android.arch.persistence.room.*
import com.bitlove.fetlife.model.dataobject.entity.content.DataEntity

@Dao
interface BaseDao<in T : DataEntity> {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(obj: T)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(vararg obj: T)

    fun insertOrUpdate(obj: T) {
        if (update(obj) != 1) {
            insert(obj)
        }
    }

    @Update
    fun update(obj: T) : Int

    @Delete
    fun delete(obj: T)
}