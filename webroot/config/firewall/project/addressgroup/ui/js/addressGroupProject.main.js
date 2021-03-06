/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

var addressGroupProjectPageLoader = new addressGroupProjectPageLoader();

function addressGroupProjectPageLoader ()
{
    this.load = function (paramObject) {
        var self = this, currMenuObj = globalObj.currMenuObj,
            hashParams = paramObject['hashParams'],
            rootDir = currMenuObj['resources']['resource'][1]['rootDir'],
            pathSecurityPolicyView = ctBaseDir + '/config/firewall/project/addressgroup/ui/js/views/addressGroupProjectView.js',
            renderFn = paramObject['function'],
            loadingStartedDefObj = paramObject['loadingStartedDefObj'];


        if (self.securityPolicyView == null) {
            requirejs([pathSecurityPolicyView], function (SecurityPolicyView) {
                self.securityPolicyView = new SecurityPolicyView();
                self.renderView(renderFn, hashParams);
                if(contrail.checkIfExist(loadingStartedDefObj)) {
                    loadingStartedDefObj.resolve();
                }
            }, function (err) {
                console.info("Firewall Page Load error:" + err);
            });
       } else {
            self.renderView(renderFn, hashParams);
        }
    }
    this.renderView = function (renderFn, hashParams) {
        $(contentContainer).html("");
        switch (renderFn) {
            case 'renderAddressGroup':
                this.securityPolicyView[renderFn]({hashParams: hashParams});
                break;
        }
    };

    this.updateViewByHash = function (hashObj, lastHashObj) {
        var renderFn;
        this.load({hashParams: hashObj, 'function': renderFn});
    };

    this.destroy = function () {
        ctwu.destroyDOMResources(ctwc.SEC_POLICY_ADDRESS_GRP_PREFIX_ID);
    };
}

