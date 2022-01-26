FROM mitre/saf

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]