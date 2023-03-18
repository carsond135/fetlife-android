function TLWebView(controller) {
    this.controller = controller
    controller.adapter = this

    var turbolinksIsReady = typeof Turbolinks !== "undefined" && Turbolinks !== null
    TurbolinksNative.setTurbolinksIsReady(turbolinksIsReady);
}

TLWebView.prototype = {
    addHeaderListener: function(name, value) {
        document.addEventListener("turbolinks:request-start", function(event) {
            var xhr = event.data.xhr
            xhr.setRequestHeader(name, value)
        })
    },

    visitLocationWithActionAndRestorationIdentifier: function(location, action, restorationIdentifier) {
        this.controller.startVisitToLocationWithAction(location, action, restorationIdentifier)
    },

    issueRequestForVisitWithIdentifier: function(identifier) {
        if (identifier == this.currentVisit.identifier) {
            this.currentVisit.issueRequest()
        }
    },

    changeHistoryForVisitWithIdentifier: function(identifier) {
        if (identifier == this.currentVisit.identifier) {
            this.currentVisit.changeHistory()
        }
    },

    loadCachedSnapshotForVisitWithIdentifier: function(identifier) {
        if (identifier == this.currentVisit.identifier) {
            this.currentVisit.loadCachedSnapshot()
        }
    },

    loadResponseForVisitWithIdentifier: function(identifier) {
        if (identifier == this.currentVisit.identifier) {
            this.currentVisit.loadResponse()
        }
    },

    cancelVisitWithIdentifier: function(identifier) {
        if (identifier == this.currentVisit.identifier) {
            this.currentVisit.cancel()
        }
    },

    visitProposedToLocationWithAction: function(location, action) {
        TurbolinksNative.visitProposedToLocationWithAction(location.absoluteURL, action);
    },

    visitStarted: function(visit) {
        this.currentVisit = visit
        TurbolinksNative.visitStarted(visit.identifier, visit.hasCachedSnapshot();
    },

    visitRequestStarted: function(visit) { },

    visitRequestCompleted: function(visit) {
        TurbolinksNative.visitRequestCompleted(visit.identifier);
    },

    visitRequestFailedWithStatusCode: function(visit, statusCode) {
        TurbolinksNative.visitRequestFailedWithStatusCode(visit.identifier, statusCode);
    },

    visitRequestFinished: function(visit) { },

    visitRendered: function(visit) {
        this.afterNextRepaint(function() {
            TurbolinksNative.visitRendered(visit.identifier)
        })
    },

    visitCompleted: function(visit) {
        TurbolinksNative.visitCompleted(visit.identifier, visit.restorationIdentifier);
    },

    pageInvalidated: function() {
        TurbolinksNative.pageInvalidated ();
    },

    afterNextRepaint: function(callback) {
        requestAnimationFrame(function() {
            requestAnimationFrame(callback)
        })
    }
}

try {
    window.webView = new TLWebView(Turbolinks.controller)
} catch (e) {
    TurbolinksNative.turbolinksDoesNotExist()
}
