import * as types from './mutation-types'

export default {

	getlist( {commit,state},{list,index} ){
		commit( types.SET_PLAY_STATE,false );
		commit( types.SET_FULL_SCREEN,true );
		commit( types.SET_SONGLIST,list );
		commit( types.SET_CURRENT_INDEX,index );
	}

}
	
