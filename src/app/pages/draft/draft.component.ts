import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from 'src/app/components/alert/alert.service';
import { DocumentService } from 'src/app/shared/services/documentos/document.service';

declare var $: any;

@Component({
    selector: 'app-draft',
    templateUrl: './draft.component.html',
    styleUrls: ['./draft.component.scss'],
})
export class DraftComponent implements OnInit {
    fileToUpload!: File;
    ip: any;
    msgArrayPage!: any[];
    msgArrayPage2!: string;
    msgGeneric: any = {};
    @BlockUI() blockUI!: NgBlockUI;
    subscribe = [];
    msg02: any;
    showOnlyLogged: boolean = true;
    //alert
    options = {
        autoClose: true,
        keepAfterRouteChange: false,
    };
    options2 = {
        autoClose: false,
        keepAfterRouteChange: false,
    };
    options3 = {
        autoClose: true,
        keepAfterRouteChange: false,
    };

    msgSaved: any = {};
    msgClass: any = {};

    idDraft: any = null;
    idFather: any = null;
    response: any;
    version: any = null;

    mostrarPlaceholder: boolean = false; //en falso para ocultar placeholder de archivos, volver a colocar en true para habilitar carga de archivos
    placeholderTitulo: String = 'Happy to see you!'; // Happy to see you! para cuando no esta habilitado el placeholder de archivos, volver a colocar en 'Please, add a title' para habilitar carga de archivos

    cargandoArchivo: boolean = false;
    errorArchivo: boolean = false;
    htmlContent: String = '';
    htmlContentTitulo: String = '';
    editorMostrado: any;
    tituloDocumento: string = '';
    documentoSinTitulo: String = '';

    tituloH1!: String;
    confirmarProtegerDocumento: boolean = false;
    permitirPublicarDraft: boolean = false;
    mostrarErrorDeProteccion: boolean = false;
    violaciones: any
    mostrarMensajeExitoso: boolean = false;
    mostrarErrorDeDatos: boolean = false;
    mostrarComprobadoOriginalidad: boolean = false;
    accionando: boolean = false;
    tooltipTitulo!: String;
    alertaProcesoMensaje!: String;
    alertaProcesoClase!: String;
    deviceInfo = null;

    Ckeditor: any;
    EditorConfiguracion: any;

    checking_for_originality: boolean = false
    checking_for_originality_passed: boolean = false
    blockUiColor!: string;
    fingirDemenciaConElIdProporcionado: boolean = true;
    alertVerEjemplosProtegidos: boolean = true;
    selectBlockchain: boolean = false;
    lockOrUnlockedDialog: boolean = false;
    userSelectedLocked: boolean = false;
    busquedasRestantes = '';

    /** Nuevas variables */
    titulo: string = '';
    contenido: string = '';
    documento!: any;
    userSelectedBlockchain: string = '';
    plagios: any;
    overallPercentage: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private documentService: DocumentService,
    ) {
    }

    ngOnInit(): void {
        const uuid = this.route.snapshot.paramMap.get('uuid')
        if (uuid) {
            this.blockUI.start('loading');

            this.documentService.getByUuid(uuid).subscribe(document => {
                this.titulo = document.data.titulo;
                this.contenido = document.data.contenido;
                this.documento = document.data;

                this.alertVerEjemplosProtegidos = false;
                this.blockUI.stop();
            });
        }


        this.msgSaved = '';
    }

    /** Nuevos metodos */
    saveDoc() {
        if (this.validate()) {
            this.msgSaved = 'Saving...';
            this.blockUI.start('Processing...');

            const uuid = this.route.snapshot.paramMap.get('uuid')
            if (uuid) {
                //update data
                this.documento.titulo = this.titulo;
                this.documento.contenido = this.contenido;

                this.documentService.update(this.documento)
                    .subscribe(data => {
                        this.blockUI.stop();
                        this.msgSaved = '';
                        // console.log('actualizando data', data)
                    })
            } else {

                //create data
                this.documentService.save(this.titulo, this.contenido).subscribe(data => {
                    // console.log('respuesta de guardado', data);
                    this.blockUI.stop();
                    this.msgSaved = '';
                    this.router.navigate(['/draft-list']);

                });

            }
        } else {
            console.log('mostrar mensajes de error')
        }

    }

    private validate() {
        this.alertVerEjemplosProtegidos = false;
        if (!this.hayTitulo()) {
            this.placeholderTitulo = 'Please, add a title';
            return this.mostrarErrorGeneral(1, 'Please, add a title')
        }
        if (this.contenidoConMenosDe50Caracteres()) {
            return this.mostrarErrorGeneral(1, 'Can\'t protect. The document needs to be 50 characters of longer')
        }
        if (!this.hayContenido()) {
            return this.mostrarErrorGeneral(4, 'Empty field')
        }

        return true
    }

    private hayTitulo(): boolean {
        return this.titulo.length !== 0 || this.titulo != ''
    }

    private hayContenido(): boolean {
        return (this.contenido.length !== 0 || this.contenido != '')
    }

    private contenidoConMenosDe50Caracteres(): boolean {
        let tmp = this.contenido.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ');
        return (tmp.length < 50)
    }

    bloquearDesbloquear() {
        if (this.validate()) {
            this.accionando = true;
            this.selectBlockchain = true;
            // this.lockOrUnlockedDialog = true;
            this.tituloH1 = 'Protecting your document'; //'docTranslate.draft.lbl_title_protecting_draft'
        }
    }

    private saveAfterProtect() {
        console.log('no existe', this.documento)
        if (this.documento === undefined) {
            this.documentService.save(this.titulo, this.contenido, true).subscribe(res => {
                this.msgSaved = 'Saved';
                const data: any = res;
                this.documento = data.data;
            });
        } else {
            this.documento.titulo = this.titulo;
            this.documento.contenido = this.contenido;
            this.documento.protegido = true;
            this.documentService.update(this.documento).subscribe(res => {
                this.msgSaved = 'Saved';
                const data: any = res;
                this.documento = data.data;
            });
        }
    }

    async protectDocument() {
        this.mostrarComprobadoOriginalidad = true
        this.alertaProcesoMensaje = `<span>Originality check <br><br> This could take a while</span>`
        this.blockUiColor = 'morado'

        this.confirmarProtegerDocumento = false
        this.msgSaved = 'Saving...';
        this.accionando = true;

        this.saveAfterProtect();

        if (this.validate() && this.documento) {

            this.documento.bloqueado = this.userSelectedLocked;
            this.documento.protegido = true;

            //1 Verificar originalidad de documento, encadenar con
            await this.documentService.verifyPlagarism(this.documento);
            await this.documentService.GetPlagarism().subscribe(plagios => {
                // console.log('plagios', plagios)
                if (plagios && plagios.plagarism && plagios.result) {
                    //contenido anti original mostrar error
		    this.overallPercentage = plagios.percentage
                    this.plagios = plagios.result
                    this.mostrarComprobadoOriginalidad = false
                    this.accionando = false
                    this.mostrarErrorDeProteccion = true;
                    this.tituloH1 = 'Can\'t protect';

                } else {
                    // contenido original siguientes pasos
                    this.blockUiColor = 'verde'
                    this.alertaProcesoMensaje = `<span>Originality check <br> Passed!</span>`
                    this.blockUI.update(this.alertaProcesoMensaje);


                    //proteger documento
                    this.documentService.update(this.documento).subscribe(res => {
                        let data: any = res
                        //   //3 generar certificado enviando a blockchaing de fondo
                        this.blockUiColor = 'morado';
                        this.alertaProcesoMensaje = `<span>Originality check <br> Passed! <br></span><br><br><span>  Sending to IPFS and blockchain...</span>`
                        this.blockUI.update(this.alertaProcesoMensaje);


                        this.documento.red = this.userSelectedBlockchain;

                        this.documentService.crearCertificado(this.documento).subscribe(res => {
                            this.alertaProcesoMensaje = `<span>Originality check <br> Passed! </span><br><br><span>  Sending to IPFS and blockchain...<br>Sent!</span>`
                            this.blockUiColor = 'verde';
                            this.blockUI.update(this.alertaProcesoMensaje);

                            this.mostrarComprobadoOriginalidad = false
                            this.mostrarMensajeExitoso = true;
                            this.tituloH1 = this.documento.titulo;
                            // this.draftService.setTotalObs(1); // reducir la cantidad total de usos a 1
                            let data = res
                            this.router.navigate(['/protected-document', this.documento.uuid])
                            this.blockUI.stop()
                        }, error => {
                            this.blockUI.stop()
                        });

                    }); //fin actualizacion de documento a protegido
                }
            });

            this.msgSaved = '';
            this.blockUI.stop();
        } else {
            setTimeout(() => {

                this.protectDocument();
            }, 15000)
        }
        this.blockUI.stop();

    }

    setBlockchain(blockchain: string) {
        this.userSelectedBlockchain = blockchain;
        this.selectBlockchain = false;
        this.lockOrUnlockedDialog = true;
    }

    onPasteSplitTitleAndBodyText(userEvent: ClipboardEvent) {
        if (!this.hayTitulo() && !this.hayContenido()) {
            let clipboardData = userEvent.clipboardData;
            let pastedText = clipboardData?.getData('text');
            let tmp = pastedText?.split(/\r?\n/).filter(item => item) || [''];

            if (tmp?.length > 1) {
                userEvent.preventDefault();
                this.titulo = tmp[0];
                this.contenido = tmp.slice(1).join('\n\n');
            }
        }
    }

    /** fin de nuevos metodos */



    //metodos viejos hacia abajo (Horrible)

    obtenerMensajeDeError(label: number = 0): String {
        this.msgClass = 'estatus-chip-natural';
        switch (label) {
            case 1:
                return 'Saved';
                break;
            case 2:
                return 'Saving…';
                break;
            case 3:
                return 'Saved offline';
                break;
            case 4:
                this.msgClass = 'estatus-chip-advertencia';
                return 'Failed to protect';
                break;
            case 5:
                return 'Uploading...';
                break;
            case 6:
                return 'Doc is a bit long...';
                break;
            case 7:
                this.msgClass = 'estatus-chip-advertencia';
                return 'Failed to upload';
                break;
            case 8:
                return 'Connection lost';
                break;
            // TODO remplazar el texto "Missing source or author in quoted text" por indice de traduccion
            case 9:
                return 'Missing source or author in quoted text';
                break;
            case 10:
                return 'docTranslate.draft.lbl_edit01';
                break;

            case -1:
                return '';
                break;
            default:
                return 'Saved';
                break;
        }
    }

    confirmDataProtect() {
        if (this.existeErrorEnDocumento() === false) {
            this.accionando = true;
            this.confirmarProtegerDocumento = true
            this.tituloH1 = 'docTranslate.draft.lbl_title_protecting_draft';
        }
    }

    lockOrUnlocked() {
        if (this.existeErrorEnDocumento() === false) {
            this.accionando = true;
            this.alertVerEjemplosProtegidos = false;
            this.lockOrUnlockedDialog = true;
            this.tituloH1 = 'docTranslate.draft.lbl_title_protecting_draft'
        }
    }

    setLocked(userValue: boolean) {
        this.userSelectedLocked = userValue;
        this.lockOrUnlockedDialog = false;
        this.confirmarProtegerDocumento = true;
    }

    CancelDataProtect() {
        this.accionando = false
        this.confirmarProtegerDocumento = false
        this.tituloH1 = 'docTranslate.draft.lbl_title'
        this.msgSaved = this.obtenerMensajeDeError(4)
    }

    DataProtect() {
        // this.blockUI.start('')
        this.mostrarComprobadoOriginalidad = true
        this.alertaProcesoMensaje = `<span>${'docTranslate.draft.lbl_title_checking_for_originality'} <br><br> This could take a while</span>`
        this.blockUiColor = 'morado'

        this.confirmarProtegerDocumento = false
        this.msgSaved = this.obtenerMensajeDeError(2)
        this.accionando = true

        if (this.existeErrorEnDocumento() === false) {
            console.log('no hay error en doumento');
            // this.busquedasRestantes--


            (async () => {
                let idNote = this.idFather ?? this.idDraft

                // this.draftService.plagiarismChecker(this.tituloDocumento, this.documentoSinTitulo, idNote).subscribe(
                //   async respuesta => {
                //     let espera = Math.floor(Math.random() * 10000)
                //     if (espera <= 10000) espera = espera * 2
                //     if (espera >= 30000) espera = espera / 5
                //     await this.sleep(espera);

                //     // console.log('plagiarismChecker - ', respuesta.body)
                //     if (this.verificarDataDeApi(respuesta)) switch (respuesta.body.DATA.ID) {
                //       default:
                //         this.alertaProcesoMensaje = `<span>${this.docTranslate.draft.lbl_title_checking_for_originality} <br> ${this.docTranslate.draft.passed}</span>`
                //         this.blockUiColor = 'verde'
                //         // this.blockUI.update(this.alertaProcesoMensaje)
                //         this.draftService.certificateDraft(this.tituloDocumento, this.documentoSinTitulo, this.userSelectedLocked, idNote).subscribe(
                //           respuesta => {
                //             this.alertaProcesoMensaje = `<span>${this.docTranslate.draft.lbl_title_checking_for_originality} <br> ${this.docTranslate.draft.passed}</span> <span class="offset-top">${this.docTranslate.draft.sending_to_ipfs_blockchain}</span>`
                //             this.blockUiColor = 'morado'
                //             // this.blockUI.update(this.alertaProcesoMensaje)
                //             console.log('certificateDraft - ', respuesta.body)
                //             console.log('ipfs -', respuesta.body.DATA.DATA.ipfs)
                //             if (this.verificarDataDeApi(respuesta)) switch (respuesta.body.ID) {
                //               case '00':
                //                 this.draftService.blockchainDraft(this.tituloDocumento, this.documentoSinTitulo, respuesta.body.DATA.DATA.hash_ipfs, idNote).subscribe(
                //                   respuesta => {
                //                     this.alertaProcesoMensaje = `<span>${this.docTranslate.draft.lbl_title_checking_for_originality} <br> ${this.docTranslate.draft.passed}</span> <span class="offset-top">${this.docTranslate.draft.sending_to_ipfs_blockchain}</span><span>${this.docTranslate.draft.sent}</span>`
                //                     this.blockUiColor = 'verde'
                //                     // this.blockUI.update(this.alertaProcesoMensaje)
                //                     console.log('blockchainDraft - ', respuesta.body)
                //                     if (this.verificarDataDeApi(respuesta)) switch (respuesta.body.ID) {
                //                       case '00': // PROCESO EXITOSO BlockChain
                //                         // this.blockUI.stop();
                //                         this.blockUiColor = null
                //                         this.mostrarComprobadoOriginalidad = false
                //                         this.mostrarMensajeExitoso = true;
                //                         this.tituloH1 = this.tituloDocumento;
                //                         this.draftService.setTotalObs(1)
                //                         this.router.navigate(['/viewDoc', respuesta.body.DATA.DATA.note_id, 'report'])
                //                         break;

                //                       default:
                //                         // this.blockUI.stop();
                //                         this.blockUiColor = null
                //                         this.mostrarComprobadoOriginalidad = false
                //                         this.mostrarErrorDeDatos = true;
                //                         this.tituloH1 = "Can't protect";
                //                         break;
                //                     }
                //                   }
                //                 )
                //                 break;

                //               default:
                //                 // this.blockUI.stop();
                //                 this.mostrarComprobadoOriginalidad = false
                //                 this.mostrarErrorDeDatos = true;
                //                 this.tituloH1 = "Can't protect";
                //                 break;
                //             }
                //           }
                //         )
                //         break;

                //       case '22':
                //         // this.blockUI.stop();
                //         this.blockUiColor = null
                //         this.mostrarComprobadoOriginalidad = false
                //         this.mostrarErrorDeDatos = true;
                //         this.tituloH1 = "Can't protect";
                //         this.mostrarErrorGeneral(4, "Seems there's a quote <br> Please, add a link to a source");
                //         break;
                //     }
                //   }, error => {
                //     // this.blockUI.stop();
                //     this.mostrarComprobadoOriginalidad = false
                //     this.accionando = false
                //     this.mostrarErrorDeDatos = true;
                //     this.tituloH1 = "Can't protect";
                //     //this.mostrarErrorGeneral(1, this.docTranslate.response.lbl_error_16);

                //   }
                // )
            })()
        } else {
            // this.blockUI.stop();
            console.log('existe uno o mas errores en el documento')
            return this.existeErrorEnDocumento()
        }

    }

    verificarDataDeApi(data: any) {
        if (data && data.body.DATA) {
            return true
        } else {
            this.blockUI.stop();
            this.mostrarComprobadoOriginalidad = false
            this.mostrarErrorDeDatos = true;
            this.tituloH1 = 'Can\'t protect - Unknown error';
            return false
        }
    }

    DataSave() {
        // this.blockUI.start()
        this.alertVerEjemplosProtegidos = false;
        this.accionando = true;
        this.msgSaved = this.obtenerMensajeDeError(2);

        if (this.existeErrorEnDocumento() === false) {
            (async () => {
                // this.busquedasRestantes--
                this.guardarEnDraft();
            })();

        } else {
            console.log('existe uno o mas errores en el documento')
            // return this.existeErrorEnDocumento()
        }
        this.accionando = false;

    }

    private guardarEnDraft() {
        let idNote = this.idFather ?? this.idDraft
        // this.draftService.createDraft(this.tituloDocumento, this.documentoSinTitulo, idNote).subscribe(
        //   resp => {
        //     const body = resp.body;
        //     const headers = resp.headers;
        //     console.log('createDraft -body-', body);


        //     if (body && body.DATA.ID) {
        //       switch (body.DATA.ID) {
        //         case '00':
        //           this.mostrarComprobadoOriginalidad = false
        //           // this.blockUI.stop()
        //           this.msgSaved = this.obtenerMensajeDeError(1);
        //           this.alertService.warn(this.docTranslate.response.btn_saved0, this.options3);
        //           this.router.navigate(['/listDraft'])
        //           break;

        //         case '01':
        //           this.alertService.warn(this.docTranslate.response.lbl_error_01, this.options);
        //           break;
        //         case '02':
        //           this.alertService.warn(this.docTranslate.response.lbl_error_02, this.options);
        //           break;
        //         case '03':
        //           this.alertService.warn(this.docTranslate.draft.msg_error_03, this.options);
        //           break;
        //         case '16':
        //           console.log('vacio: 14')
        //           this.alertService.warn(this.docTranslate.response.lbl_error_16, this.options);
        //           break;
        //         case '20':
        //           this.alertService.warn(this.docTranslate.draft.msg_error_20, this.options);
        //           this.msgSaved = this.obtenerMensajeDeError(4);
        //           break;
        //         case '21':
        //           console.log('body.DATA.DATA.Pages', body.DATA.DATA.Pages);
        //           this.msgArrayPage = [];
        //           let x = body.DATA.DATA.Pages;

        //           for (let page of x) {
        //             let pusheable = {
        //               'text': '<li text-align = left><b>&nbsp;' + this.docTranslate.draft.msg_link + ':&nbsp</b>&nbsp;<a href=' + page.link + ' target="_blank">' + page.link + '</a> &nbsp;<b>&nbsp;' + this.docTranslate.draft.msg_title + ':&nbsp;</b>&nbsp;' + page.title + '&nbsp;<b>&nbsp;' + this.docTranslate.draft.msg_snippet + ':&nbsp;</b>&nbsp;' + page.snippet + "</br></br></li>",
        //             };
        //             this.msgArrayPage.push(pusheable);

        //             console.log('pusheable', pusheable);
        //           }
        //           this.msgArrayPage2 = '';
        //           for (let dathtml of this.msgArrayPage.reverse()) {
        //             if (this.msgArrayPage2 == "") {
        //               this.msgArrayPage2 = dathtml.text;
        //             } else {
        //               this.msgArrayPage2 = dathtml.text + this.msgArrayPage2;
        //             }
        //           }

        //           let y = (this.docTranslate.draft.msg_error_21 + "</br> <ul text-align = left>" + this.msgArrayPage2 + "</ul>");

        //           this.alertService.error(y, this.options2);
        //           break;
        //         case '22':
        //           this.alertService.warn(this.docTranslate.draft.msg_error_22, this.options);
        //           break;
        //         case '23':
        //           this.alertService.warn(this.docTranslate.draft.msg_error_23, this.options);
        //           break;

        //         default:
        //           console.log('vacio: 15')
        //           this.mostrarErrorGeneral(1, this.docTranslate.response.lbl_error_16);
        //           break;
        //       }
        //     } else {
        //       console.log('ERROR DE BODY DATA createDraft: ', body);
        //       this.mostrarErrorDeDatos = true;
        //       this.tituloH1 = "Can't protect";
        //     }
        //     this.accionando = false;
        //   },
        //   error => {
        //     // this.blockUI.stop();
        //     this.mostrarComprobadoOriginalidad = false
        //     this.msg02 = this.docTranslate.response.lbl_error_02;
        //     this.alertService.error(this.msg02, this.options);
        //   });
    }

    public obtenerEditor(editor: any) {
        this.editorMostrado = editor;
    }

    remplazando: boolean = false;

    public hayBlockQuotesSinEnlaces(editor: any): boolean {
        var data: any, temporal: any;
        data = temporal = this.htmlContent
        const blockquotes = data.match(/<blockquote>(.|\n)*?<\/blockquote>/g)
        if (blockquotes) {
            blockquotes.forEach(function (contenido: any) {
                const href = contenido.match(/<a[^>]*>(.|\n)*?<\/a>/g)
                if (!href) {
                    //No hay etiqueta anclaje en el blockquote
                    // TODO remplazar el texto "Missing source" por indice de traduccion
                    temporal = data.replace(contenido, contenido.replace('</blockquote>', '<a href="#">Missing Source / Author</a></blockquote>'))
                }
            });

            if (data != temporal) {
                editor.setData(temporal)
                return true
            }
            return false
        } else {
            return false
        }
    }

    public elTituloEstaVacio(): boolean {
        return (this.tituloDocumento.length === 0 || !this.tituloDocumento.trim())
    }

    public elContenidoEstaVacio(): boolean {
        return (this.documentoSinTitulo.length === 0 || !this.documentoSinTitulo.trim())
    }

    public elContenidoTieneMenosDe50Caracteres(): boolean {
        let tmp = this.documentoSinTitulo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s+/g, ' ');
        return (tmp.length < 50)
    }

    public mostrarErrorGeneral(errorPill: any, errorAlerta: any) {
        this.accionando = false;
        this.mostrarErrorDeProteccion = false;
        this.mostrarMensajeExitoso = false;
        this.mostrarErrorDeDatos = false;
        // this.blockUI.stop();
        this.mostrarComprobadoOriginalidad = false
        this.msgSaved = this.obtenerMensajeDeError(errorPill);
        this.alertService.error(errorAlerta, this.options)
    }

    public existeErrorEnDocumento() {
        this.accionando = true;
        this.mostrarErrorDeProteccion = false;
        this.mostrarMensajeExitoso = false;
        this.mostrarErrorDeDatos = false;

        if (this.elTituloEstaVacio()) {
            this.blockUI.stop()
            this.placeholderTitulo = 'Please, add a title';
            this.tituloH1 = 'New Draft';
            return this.mostrarErrorGeneral(1, 'docTranslate.draft.lbl_title_cant_protect_no_title')
        }
        if (this.elContenidoEstaVacio()) {
            this.blockUI.stop()
            return this.mostrarErrorGeneral(4, 'docTranslate.response.lbl_error_16')
        }
        if (this.hayBlockQuotesSinEnlaces(this.editorMostrado)) {
            this.blockUI.stop()
            return this.mostrarErrorGeneral(1, 'docTranslate.draft.lbl_title_cant_protect_missing_quote_source')
        }
        if (this.elContenidoTieneMenosDe50Caracteres()) {
            this.blockUI.stop()
            return this.mostrarErrorGeneral(1, 'docTranslate.draft.lbl_title_cant_protect_minimun_characters')
        }

        return false;
    }

    // sleep(milliseconds) {
    //   const date = Date.now();
    //   var currentDate = new Date(date + milliseconds);
    //   do {
    //   } while (currentDate.getTime() - date < milliseconds);
    // }

    sleep(ms: any = false) {
        if (!ms) {
            ms = Math.floor(Math.random() * 10000);
            if (ms <= 10000) ms = ms * 2;
            if (ms >= 30000) ms = ms / 5;
        }
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getDataDraftByID(id: any) {

        this.blockUI.start('docTranslate.msgGeneric.msg_blockUi');
        // this.draftService.getDraftById(id).subscribe(params => {

        //   this.response = params;
        //   this.blockUI.stop();
        //   if (this.response.body.DATA.ID == "00") {
        //     this.fingirDemenciaConElIdProporcionado = false
        //     this.tituloH1 = this.response.body.DATA.DATA[0].title.toString().substring(0, 50) + "...";
        //     this.tituloDocumento = this.response.body.DATA.DATA[0].title.toString();
        //     this.documentoSinTitulo = this.response.body.DATA.DATA[0].description;
        //     this.htmlContent = this.tituloDocumento + " " + this.response.body.DATA.DATA[0].description;
        //     this.version = parseInt(this.response.body.DATA.DATA[0].version)
        //     this.mostrarPlaceholder = false // Se oculta el placeholder falso y se muestra el editor con los datos del backend


        //     this.idFather = this.response.body.DATA.DATA[0].id_father ?? null


        //     console.log("el idFather  es - ", this.idFather)
        //     if (this.response.body.DATA.DATA[0].status == "5" || this.response.body.DATA.DATA[0].status == "6") {
        //       this.version = parseInt(this.response.body.DATA.DATA[0].version_protected)
        //     } else if (this.response.body.DATA.DATA[0].status == "1" || this.response.body.DATA.DATA[0].status == "2") {
        //       this.version = parseInt(this.response.body.DATA.DATA[0].version_draft)
        //     }


        //   } else {
        //     console.log("no encontro datos")
        //     //this.router.navigate([`/${AppConfig.routes.listDraft}`]);
        //   }

        // },
        //   error => {
        //     this.blockUI.stop();
        //     console.log("error ", error)
        //   }
        // );

    }

    public ocultarPlaceholder() {
        this.mostrarPlaceholder = false
        this.errorArchivo = false
        this.cargandoArchivo = false
        this.msgSaved = this.obtenerMensajeDeError(-1)
    }

    public buscarArchivo() {
        let temp = <HTMLElement>document.querySelector('#carga_de_Archivo_id');
        temp.click();
    }

    public cargarArchivo(files: FileList) {
        this.cargandoArchivo = false
        return null;
        // this.msgSaved = this.obtenerMensajeDeError(5)
        // this.cargandoArchivo = true
        // this.errorArchivo = false
        // this.fileToUpload = files.item(0);
        // this.draftService.postFile(this.fileToUpload).subscribe(response => {
        //   console.log("archivo", response)
        //   if (response.body.DATA.ID != '27') {
        //     this.htmlContent = response.body.DATA.DESCRIPTION
        //     this.cargandoArchivo = false
        //     this.msgSaved = this.obtenerMensajeDeError(-1)
        //   } else {
        //     this.errorCargaArchivo()
        //   }
        //   this.cargandoArchivo = false
        // }, error => {
        //   console.log(error);
        // });
    }

    public errorCargaArchivo() {
        this.cargandoArchivo = false
        this.mostrarPlaceholder = false
        this.msgSaved = this.obtenerMensajeDeError(7)
        this.errorArchivo = true
    }

    public pcOMac(error: boolean = false) {
        return error ? 'docTranslate.draft.lbl_edit06' : 'this.docTranslate.draft.lbl_edit05'
        // this.deviceService.getDeviceInfo().os == "Mac"
        //   ? this.docTranslate.draft.lbl_edit06
        //   : this.docTranslate.draft.lbl_edit05
        // :
        // this.deviceService.getDeviceInfo().os == "Mac"
        //   ? this.docTranslate.draft.lbl_edit04
        //   : this.docTranslate.draft.lbl_edit03
    }

    onDrop(event: any) {
        event.preventDefault();
        this.cargarArchivo(event);
    }

    onDragOver(event: any) {
        event.stopPropagation();
        event.preventDefault();
        // alert('on drag over')
    }


    showModalL() {
        $('#myModal1').modal('show');
    }
}
