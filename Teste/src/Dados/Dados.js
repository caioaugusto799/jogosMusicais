import { musicas_opcoes, modos_map, nivel_ativ } from './dados_fixos';
import ls from 'local-storage';

export function getDadosTela(modo, nivel) {
    console.log(musicas_opcoes);
}

export function getAtividades(){
    let mapeamento = new Map();

    modos_map.forEach(mod => {
        mapeamento.set(mod.modo, mod.texto);
    });

    return mapeamento;
}

export function getNiveis(modo) {
    let niveis = new Set();
    musicas_opcoes.forEach( op => {
        if ( op.modo === modo ){
            niveis.add(op.nivel);
        }
    });
    return Array.from(niveis);
}

export function getInfos(modo, nivel, ativ){
    let info_ops = new Array();
    let info_def = null;
    let info_text = null;
    musicas_opcoes.forEach( op => {
        if ( 
            op.modo  === modo  && 
            op.nivel ==  nivel && 
            op.ativ  ==  ativ
        ) {
            if (op.opcao == 'P')
                info_def = op;
            else info_ops.push(op);
        }
    });

    nivel_ativ.forEach( op => {
        if ( 
            op.modo  === modo  && 
            op.nivel ==  nivel && 
            op.ativ  ==  ativ
        ) {
            info_text = op.texto;
        }
    });

    return [info_ops, info_def, info_text];
}

export function getCompletion(modo, nivel) {
    const val = ls.get('comp_'+modo+"_"+nivel);
    if ( val != null ) return true;
    return false;
    /*const val = ls.get('nivel_comp');
    if ( val === null ){
        let ret = new Map();
        const ativs = getAtividades();
        const key_it = ativs.keys();
        for (const vali of key_it) {
            console.log(vali);
            ret.set(vali, new Map());
        }
        ls.set('nivel_comp', ret)
        return ret;
    }
    console.log(modo);
    console.log(val);
    return val.get(modo);*/
}

export function setCompletion(modo, nivel) {
    //let comp = getCompletion();
    //comp.get(modo).set(nivel, true);
    ls.set('comp_'+modo+"_"+nivel, 1);
}