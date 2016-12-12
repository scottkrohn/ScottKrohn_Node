/**
 * Created by smk on 12/3/2016.
 */

/* Switches the active page marker in the navigation bar
* */
function switchActive(pageName){
    $('.nav').find('.active').removeClass('active');
    $('.nav').find('#' + pageName).parent().addClass('active');
}