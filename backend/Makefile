.PHONY: clean help serve

MVN=mvn
SPRING=spring-boot

clean: ## supprimer le target
	$(MVN) clean

help:
    grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

serve: ## Lancer le serveur
	$(MVN) clean $(SPRING):run
